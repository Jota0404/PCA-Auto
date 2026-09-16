import { prisma } from "@/src/infrastructure/db/prisma";
import { ExcelImporter, type ImportedPcaItem } from "@/src/infrastructure/excel/excel-importer";
import { PcaValidator } from "./pca-validator";

export interface ImportPcaInput {
  ano: number;
  unidade: string;
  nome: string;
  arquivo: Buffer;
}

export interface ImportPcaResult {
  pcaId: number;
  totalItens: number;
}

export class PcaImportError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PcaImportError";
  }
}

/**
 * Application use case for creating a PCA from one validated Excel file.
 *
 * The use case is deliberately independent from the e-ComprasDF. Importing a
 * spreadsheet only validates local data and persists the draft PCA; no portal
 * request is performed at this stage.
 */
export class ImportPca {
  constructor(
    private readonly importer = new ExcelImporter(),
    private readonly validator = new PcaValidator(),
  ) {}

  async execute(input: ImportPcaInput): Promise<ImportPcaResult> {
    this.validateMetadata(input);

    const items = await this.importer.import(input.arquivo);
    const validation = this.validator.validate(items);

    if (!validation.valid) {
      const details = validation.issues
        .filter((issue) => issue.severity === "ERROR")
        .map((issue) => `${issue.field}: ${issue.message}`)
        .join("; ");

      throw new PcaImportError(`Importação bloqueada: ${details}`);
    }

    const pca = await prisma.pca.create({
      data: {
        ano: input.ano,
        unidade: input.unidade.trim(),
        nome: input.nome.trim(),
        status: "DRAFT",
        items: {
          create: items.map((item: ImportedPcaItem) => ({
            codigoCatalogo: item.codigoCatalogo.trim(),
            descricao: item.descricao,
            quantidade: item.quantidade,
            valorEstimado: item.valorEstimado,
            dataDesejada: item.dataDesejada,
            prioridade: item.prioridade,
            modalidade: item.modalidade,
            statusExecucao: "PENDING",
          })),
        },
      },
      select: {
        id: true,
        _count: {
          select: { items: true },
        },
      },
    });

    return {
      pcaId: pca.id,
      totalItens: pca._count.items,
    };
  }

  private validateMetadata(input: ImportPcaInput): void {
    if (!Number.isInteger(input.ano) || input.ano < 2000) {
      throw new PcaImportError("Ano do PCA inválido.");
    }

    if (!input.unidade.trim()) {
      throw new PcaImportError("Unidade do PCA é obrigatória.");
    }

    if (!input.nome.trim()) {
      throw new PcaImportError("Nome do PCA é obrigatório.");
    }

    if (!input.arquivo.length) {
      throw new PcaImportError("Arquivo Excel não informado.");
    }
  }
}

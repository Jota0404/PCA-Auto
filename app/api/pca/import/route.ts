import { NextResponse } from "next/server";
import { ImportPca, PcaImportError } from "@/src/application/pca/import-pca";

export const runtime = "nodejs";

/**
 * Receives an XLSX file and persists a new PCA draft after local validation.
 *
 * Expected multipart/form-data fields:
 * - ano: PCA year
 * - unidade: organizational unit
 * - nome: PCA name
 * - arquivo: XLSX file
 *
 * This endpoint never calls the e-ComprasDF.
 */
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const anoValue = formData.get("ano");
    const unidade = formData.get("unidade");
    const nome = formData.get("nome");
    const arquivo = formData.get("arquivo");

    if (
      typeof anoValue !== "string" ||
      typeof unidade !== "string" ||
      typeof nome !== "string" ||
      !(arquivo instanceof File)
    ) {
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes ou inválidos." },
        { status: 400 },
      );
    }

    const ano = Number(anoValue);
    if (!Number.isInteger(ano)) {
      return NextResponse.json(
        { error: "Ano deve ser um número inteiro." },
        { status: 400 },
      );
    }

    const service = new ImportPca();
    const result = await service.execute({
      ano,
      unidade,
      nome,
      arquivo: Buffer.from(await arquivo.arrayBuffer()),
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro interno durante a importação.";

    if (error instanceof PcaImportError) {
      return NextResponse.json({ error: message }, { status: 422 });
    }

    return NextResponse.json(
      { error: "Não foi possível importar o PCA." },
      { status: 500 },
    );
  }
}

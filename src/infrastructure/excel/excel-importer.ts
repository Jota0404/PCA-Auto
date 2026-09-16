import ExcelJS from "exceljs";

/**
 * Normalized representation of one spreadsheet row before it is persisted.
 *
 * The importer only converts spreadsheet values. It deliberately does not
 * decide whether an item is valid according to PCA or e-ComprasDF rules.
 */
export interface ImportedPcaItem {
  codigoCatalogo: string;
  descricao?: string;
  quantidade?: number;
  valorEstimado?: number;
  dataDesejada?: Date;
  prioridade?: string;
  modalidade?: string;
}

export class ExcelImportError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ExcelImportError";
  }
}

/**
 * Converts the first worksheet of an XLSX file into typed PCA item records.
 *
 * Only the columns already defined by the project documentation are mapped.
 * Invalid non-empty numeric cells are rejected instead of being silently
 * converted to undefined, because silently losing input would make later
 * validation unreliable.
 */
export class ExcelImporter {
  async import(buffer: Buffer): Promise<ImportedPcaItem[]> {
    if (!buffer.length) {
      throw new ExcelImportError("O arquivo Excel está vazio.");
    }

    const workbook = new ExcelJS.Workbook();
    try {
      // ExcelJS 4.4.0 declares a Node Buffer shape that is incompatible with
      // the newer @types/node Buffer generic. Runtime expects the same bytes,
      // so isolate the typing mismatch at this dependency boundary instead of
      // weakening the importer API or changing the input data.
      const excelBuffer = buffer as unknown as Parameters<
        typeof workbook.xlsx.load
      >[0];
      await workbook.xlsx.load(excelBuffer);
    } catch (error) {
      throw new ExcelImportError(
        `Não foi possível ler o arquivo Excel: ${this.errorMessage(error)}`,
      );
    }

    const worksheet = workbook.worksheets[0];
    if (!worksheet) {
      throw new ExcelImportError("A planilha não contém nenhuma aba.");
    }

    const headers = this.readHeaders(worksheet);
    const codigoColumn = headers.get("codigo");

    if (!codigoColumn) {
      throw new ExcelImportError(
        'A planilha precisa conter uma coluna "Código".',
      );
    }

    const items: ImportedPcaItem[] = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;

      const codigoCatalogo = this.readString(row, codigoColumn);

      // Empty rows are ignored. A row with a code is considered an item and
      // its remaining malformed values must fail the import explicitly.
      if (!codigoCatalogo) return;

      items.push({
        codigoCatalogo,
        descricao: this.readOptionalString(row, headers.get("descricao")),
        quantidade: this.readOptionalNumber(
          row,
          headers.get("quantidade"),
          rowNumber,
          "quantidade",
        ),
        valorEstimado: this.readOptionalNumber(
          row,
          headers.get("valor"),
          rowNumber,
          "valor",
        ),
        dataDesejada: this.readOptionalDate(
          row,
          headers.get("data desejada"),
          rowNumber,
        ),
        prioridade: this.readOptionalString(row, headers.get("prioridade")),
        modalidade: this.readOptionalString(row, headers.get("modalidade")),
      });
    });

    return items;
  }

  private readHeaders(worksheet: ExcelJS.Worksheet): Map<string, number> {
    const headers = new Map<string, number>();
    const headerRow = worksheet.getRow(1);

    headerRow.eachCell((cell, columnNumber) => {
      const value = this.normalizeHeader(String(cell.value ?? ""));
      if (!value) return;

      // Only the first occurrence of a normalized header is accepted. A
      // duplicated header would otherwise make the imported mapping implicit.
      if (!headers.has(value)) headers.set(value, columnNumber);
    });

    return headers;
  }

  private readString(row: ExcelJS.Row, column: number): string {
    return String(row.getCell(column).value ?? "").trim();
  }

  private readOptionalString(
    row: ExcelJS.Row,
    column?: number,
  ): string | undefined {
    if (!column) return undefined;
    const value = this.readString(row, column);
    return value || undefined;
  }

  private readOptionalNumber(
    row: ExcelJS.Row,
    column: number | undefined,
    rowNumber: number,
    fieldName: string,
  ): number | undefined {
    if (!column) return undefined;

    const value = row.getCell(column).value;
    if (value === null || value === undefined || value === "") return undefined;

    if (typeof value === "number") {
      if (Number.isFinite(value)) return value;
      throw new ExcelImportError(
        `Valor numérico inválido em ${fieldName}, linha ${rowNumber}.`,
      );
    }

    if (typeof value !== "string") {
      throw new ExcelImportError(
        `Tipo de valor não suportado em ${fieldName}, linha ${rowNumber}.`,
      );
    }

    const normalized = value.trim().replace(/\./g, "").replace(",", ".");
    const parsed = Number(normalized);

    if (!Number.isFinite(parsed)) {
      throw new ExcelImportError(
        `Valor numérico inválido em ${fieldName}, linha ${rowNumber}: "${value}".`,
      );
    }

    return parsed;
  }

  private readOptionalDate(
    row: ExcelJS.Row,
    column: number | undefined,
    rowNumber: number,
  ): Date | undefined {
    if (!column) return undefined;

    const value = row.getCell(column).value;
    if (value === null || value === undefined || value === "") return undefined;

    if (value instanceof Date) {
      if (!Number.isNaN(value.getTime())) return value;
      throw new ExcelImportError(
        `Data desejada inválida na linha ${rowNumber}.`,
      );
    }

    // We intentionally do not guess string date formats here. The project
    // documentation shows a month/year example, but does not define the
    // portal's exact date semantics. Such values must be mapped deliberately
    // when that rule is established.
    throw new ExcelImportError(
      `Data desejada em formato não suportado na linha ${rowNumber}. Use uma data Excel válida.`,
    );
  }

  private normalizeHeader(value: string): string {
    return value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .toLowerCase();
  }

  private errorMessage(error: unknown): string {
    return error instanceof Error ? error.message : "erro desconhecido";
  }
}

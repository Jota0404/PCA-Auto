import ExcelJS from "exceljs";

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
 * The importer is intentionally limited in the MVP: it reads one worksheet
 * and maps known column names without applying business validation. Business
 * rules belong to the validator layer.
 */
export class ExcelImporter {
  async import(buffer: Buffer): Promise<ImportedPcaItem[]> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.worksheets[0];
    if (!worksheet) {
      throw new ExcelImportError("A planilha não contém nenhuma aba.");
    }

    const headers = this.readHeaders(worksheet);
    const requiredHeader = "codigo";
    if (!headers.has(requiredHeader)) {
      throw new ExcelImportError(
        'A planilha precisa conter uma coluna "Código".',
      );
    }

    const items: ImportedPcaItem[] = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;

      const codigoCatalogo = this.readString(row, headers.get("codigo")!);
      if (!codigoCatalogo) return;

      items.push({
        codigoCatalogo,
        descricao: this.readOptionalString(row, headers.get("descricao")),
        quantidade: this.readOptionalNumber(row, headers.get("quantidade")),
        valorEstimado: this.readOptionalNumber(
          row,
          headers.get("valor"),
        ),
        dataDesejada: this.readOptionalDate(row, headers.get("data desejada")),
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
      if (value) headers.set(value, columnNumber);
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
    column?: number,
  ): number | undefined {
    if (!column) return undefined;
    const value = row.getCell(column).value;
    if (typeof value === "number") return value;
    if (typeof value !== "string" || !value.trim()) return undefined;

    const normalized = value
      .trim()
      .replace(/\./g, "")
      .replace(",", ".");
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  private readOptionalDate(
    row: ExcelJS.Row,
    column?: number,
  ): Date | undefined {
    if (!column) return undefined;
    const value = row.getCell(column).value;

    if (value instanceof Date) return value;
    return undefined;
  }

  private normalizeHeader(value: string): string {
    return value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .toLowerCase();
  }
}

import type { ImportedPcaItem } from "@/src/infrastructure/excel/excel-importer";

export type ValidationSeverity = "ERROR" | "WARNING";

export interface ValidationIssue {
  severity: ValidationSeverity;
  field: string;
  message: string;
}

export interface PcaValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
}

/**
 * Performs local validation before any interaction with the e-ComprasDF.
 *
 * Only rules supported by the current PCA Auto documentation belong here.
 * Portal-specific business rules are intentionally left to the integration
 * layer and must not be guessed from the spreadsheet.
 */
export class PcaValidator {
  validate(items: ImportedPcaItem[]): PcaValidationResult {
    const issues: ValidationIssue[] = [];
    const seenCodes = new Set<string>();

    if (items.length === 0) {
      issues.push({
        severity: "ERROR",
        field: "planilha",
        message: "Nenhum item foi encontrado para processamento.",
      });
      return { valid: false, issues };
    }

    for (const [index, item] of items.entries()) {
      const row = index + 2;
      const codigo = item.codigoCatalogo.trim();

      if (!codigo) {
        issues.push({
          severity: "ERROR",
          field: `linha ${row}.codigoCatalogo`,
          message: "Código de catálogo obrigatório.",
        });
      } else {
        const normalizedCode = codigo.toLowerCase();
        if (seenCodes.has(normalizedCode)) {
          issues.push({
            severity: "ERROR",
            field: `linha ${row}.codigoCatalogo`,
            message: `Código de catálogo duplicado: ${codigo}.`,
          });
        } else {
          seenCodes.add(normalizedCode);
        }
      }

      if (item.quantidade !== undefined) {
        if (!Number.isFinite(item.quantidade) || item.quantidade <= 0) {
          issues.push({
            severity: "ERROR",
            field: `linha ${row}.quantidade`,
            message: "Quantidade deve ser um número maior que zero.",
          });
        }
      }

      if (item.valorEstimado !== undefined) {
        if (!Number.isFinite(item.valorEstimado) || item.valorEstimado < 0) {
          issues.push({
            severity: "ERROR",
            field: `linha ${row}.valorEstimado`,
            message: "Valor estimado deve ser um número não negativo.",
          });
        }
      }

      if (item.dataDesejada && Number.isNaN(item.dataDesejada.getTime())) {
        issues.push({
          severity: "ERROR",
          field: `linha ${row}.dataDesejada`,
          message: "Data desejada inválida.",
        });
      }
    }

    return {
      valid: !issues.some((issue) => issue.severity === "ERROR"),
      issues,
    };
  }
}

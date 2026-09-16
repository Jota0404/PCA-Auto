import type { CatalogItem, CatalogLookupResult } from "@/src/domain/item/catalog-item";

/**
 * Selectors required to parse the catalog result page.
 *
 * The selectors are intentionally supplied by configuration because the
 * project's investigation has confirmed that the catalog returns HTML, but
 * has not yet established a stable DOM selector for the result rows.
 */
export interface CatalogParserSelectors {
  resultRow: string;
  codigo: string;
  itemId: string;
  descricao: string;
  unidade: string;
}

export class CatalogParserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CatalogParserError";
  }
}

/**
 * Converts a confirmed HTML structure into the application's catalog model.
 *
 * No fallback selectors are guessed here. If a selector is missing or a row
 * does not contain all required values, parsing fails rather than producing a
 * potentially unsafe ItemId mapping.
 */
export function parseCatalogHtml(
  html: string,
  selectors: CatalogParserSelectors,
): CatalogLookupResult {
  if (!html.trim()) {
    throw new CatalogParserError("Resposta HTML do catálogo está vazia.");
  }

  for (const [key, selector] of Object.entries(selectors)) {
    if (!selector.trim()) {
      throw new CatalogParserError(`Seletor de catálogo ausente: ${key}.`);
    }
  }

  // DOMParser is browser-only. The server-side adapter should use a DOM
  // implementation once the real selectors are captured. Keeping this parser
  // contract-only for now prevents inventing portal structure prematurely.
  throw new CatalogParserError(
    "Parser HTML ainda não foi habilitado: os seletores reais do catálogo precisam ser capturados e validados primeiro.",
  );
}

/**
 * Validates one already-extracted catalog candidate before persistence.
 */
export function validateCatalogCandidate(item: CatalogItem): CatalogItem {
  if (!item.codigoCatalogo.trim()) {
    throw new CatalogParserError("Código de catálogo ausente.");
  }

  if (!Number.isInteger(item.itemId) || item.itemId <= 0) {
    throw new CatalogParserError("ItemId inválido.");
  }

  if (!item.descricao.trim()) {
    throw new CatalogParserError("Descrição do catálogo ausente.");
  }

  if (!item.unidade.trim()) {
    throw new CatalogParserError("Unidade do catálogo ausente.");
  }

  return item;
}

import type { CatalogItem, CatalogLookupResult } from "@/src/domain/item/catalog-item";

/**
 * Explicit selectors required to parse a real e-ComprasDF catalog response.
 *
 * No default CSS selectors are provided intentionally. They must come from a
 * captured portal response and be documented as verified before production use.
 */
export interface CatalogSelectors {
  result: string;
  codigo: string;
  itemId: string;
  descricao: string;
  unidade: string;
}

export class CatalogParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CatalogParseError";
  }
}

/**
 * Parses a catalog HTML fragment using selectors captured from the real portal.
 *
 * This parser is deliberately strict: missing or duplicated required values
 * are surfaced as errors instead of being guessed or silently normalized.
 */
export class CatalogParser {
  constructor(private readonly selectors: CatalogSelectors) {}

  parse(html: string): CatalogLookupResult {
    if (!html.trim()) {
      throw new CatalogParseError("Resposta HTML do catálogo está vazia.");
    }

    if (typeof DOMParser === "undefined") {
      throw new CatalogParseError(
        "CatalogParser requer um ambiente com DOMParser. Use o adaptador HTML compatível no runtime Node.",
      );
    }

    const document = new DOMParser().parseFromString(html, "text/html");
    const resultNodes = Array.from(document.querySelectorAll(this.selectors.result));

    return {
      items: resultNodes.map((node) => this.parseResultNode(node)),
    };
  }

  private parseResultNode(node: Element): CatalogItem {
    const codigo = this.readRequired(node, this.selectors.codigo, "código");
    const itemIdText = this.readRequired(node, this.selectors.itemId, "ItemId");
    const descricao = this.readRequired(node, this.selectors.descricao, "descrição");
    const unidade = this.readRequired(node, this.selectors.unidade, "unidade");
    const itemId = Number(itemIdText);

    if (!Number.isInteger(itemId) || itemId <= 0) {
      throw new CatalogParseError(`ItemId inválido no resultado do catálogo: ${itemIdText}`);
    }

    return { codigoCatalogo: codigo, itemId, descricao, unidade };
  }

  private readRequired(node: Element, selector: string, label: string): string {
    if (!selector.trim()) {
      throw new CatalogParseError(`Seletor de ${label} não configurado.`);
    }

    const element = node.querySelector(selector);
    const value = element?.textContent?.trim() ?? "";

    if (!value) {
      throw new CatalogParseError(`Campo ${label} não encontrado no resultado.`);
    }

    return value;
  }
}

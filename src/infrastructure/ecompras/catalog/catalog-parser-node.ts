import { JSDOM } from "jsdom";
import type { CatalogItem, CatalogLookupResult } from "@/src/domain/item/catalog-item";
import type { CatalogSelectors } from "./catalog-parser";
import { CatalogParseError } from "./catalog-parser";

/**
 * Node.js HTML parser for captured e-ComprasDF responses.
 *
 * JSDOM is used only to provide a DOM implementation. The selectors remain
 * externally supplied because the real portal markup has not yet been
 * captured and verified.
 */
export class NodeCatalogParser {
  constructor(private readonly selectors: CatalogSelectors) {}

  parse(html: string): CatalogLookupResult {
    if (!html.trim()) {
      throw new CatalogParseError("Resposta HTML do catálogo está vazia.");
    }

    const dom = new JSDOM(html);
    const document = dom.window.document;
    const results = Array.from(
      document.querySelectorAll(this.selectors.result),
    );

    return {
      items: results.map((node) => this.parseResult(node)),
    };
  }

  private parseResult(node: Element): CatalogItem {
    const read = (selector: string, label: string): string => {
      if (!selector.trim()) {
        throw new CatalogParseError(`Seletor de ${label} não configurado.`);
      }

      const value = node.querySelector(selector)?.textContent?.trim() ?? "";
      if (!value) {
        throw new CatalogParseError(
          `Campo ${label} não encontrado no resultado do catálogo.`,
        );
      }

      return value;
    };

    const codigoCatalogo = read(this.selectors.codigo, "código");
    const itemIdText = read(this.selectors.itemId, "ItemId");
    const descricao = read(this.selectors.descricao, "descrição");
    const unidade = read(this.selectors.unidade, "unidade");
    const itemId = Number(itemIdText);

    if (!Number.isInteger(itemId) || itemId <= 0) {
      throw new CatalogParseError(`ItemId inválido: ${itemIdText}.`);
    }

    return { codigoCatalogo, itemId, descricao, unidade };
  }
}

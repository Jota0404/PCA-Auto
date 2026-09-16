import type { EComprasAdapter, ItemInclusionContext, ItemSubmission, ItemSubmissionResult } from "./ecompras-adapter";
import type { CatalogLookupResult } from "@/src/domain/item/catalog-item";
import { EComprasHttpClient } from "./ecompras-http-client";
import { NodeCatalogParser } from "./catalog/catalog-parser-node";
import type { CatalogSelectors } from "./catalog/catalog-parser";

/**
 * HTTP adapter for the catalog portion of e-ComprasDF.
 *
 * This adapter intentionally supports catalog reads only. The query parameter
 * mapping and HTML selectors are configuration because neither has been
 * confirmed against a live request yet. Item submission remains blocked.
 */
export class EComprasHttpAdapter implements EComprasAdapter {
  public constructor(
    private readonly httpClient: EComprasHttpClient,
    private readonly catalogSelectors: CatalogSelectors,
    private readonly catalogQuery: Record<string, string>,
  ) {}

  async buscarItemPorCodigo(codigoCatalogo: string): Promise<CatalogLookupResult> {
    const query = { ...this.catalogQuery };

    if (query.Pesquisa === undefined) {
      query.Pesquisa = codigoCatalogo;
    }

    const page = await this.httpClient.getCatalogPage(query);
    return new NodeCatalogParser(this.catalogSelectors).parse(page.html);
  }

  async prepareItemInclusion(itemId: number): Promise<ItemInclusionContext> {
    if (!Number.isInteger(itemId) || itemId <= 0) {
      throw new Error("ItemId inválido.");
    }

    return { itemId };
  }

  async submitItem(_data: ItemSubmission): Promise<ItemSubmissionResult> {
    throw new Error(
      "Envio real permanece bloqueado até o POST, sessão e confirmação do e-ComprasDF serem validados.",
    );
  }
}

import type {
  EComprasAdapter,
  ItemInclusionContext,
  ItemSubmission,
  ItemSubmissionResult,
} from "./ecompras-adapter";
import type { CatalogLookupResult } from "@/src/domain/item/catalog-item";
import { EComprasHttpClient } from "./ecompras-http-client";
import { NodeCatalogParser } from "./catalog/catalog-parser-node";
import type { CatalogSelectors } from "./catalog/catalog-parser";

/**
 * Explicit query configuration for a verified catalog request.
 *
 * `codigoParameter` must come from a real network capture. No portal query
 * parameter is assumed by this adapter.
 */
export interface CatalogQueryConfig {
  codigoParameter: string;
  staticParameters?: Record<string, string>;
}

/**
 * HTTP adapter for the catalog portion of e-ComprasDF.
 *
 * Catalog reads are supported once the query parameter and HTML selectors have
 * been explicitly configured from captured portal evidence. Item submission
 * remains blocked.
 */
export class EComprasHttpAdapter implements EComprasAdapter {
  public constructor(
    private readonly httpClient: EComprasHttpClient,
    private readonly catalogSelectors: CatalogSelectors,
    private readonly catalogQuery: CatalogQueryConfig,
  ) {
    if (!catalogQuery.codigoParameter.trim()) {
      throw new Error("Parâmetro de código do catálogo não configurado.");
    }
  }

  async buscarItemPorCodigo(codigoCatalogo: string): Promise<CatalogLookupResult> {
    const normalizedCode = codigoCatalogo.trim();
    if (!normalizedCode) {
      throw new Error("Código de catálogo não pode ser vazio.");
    }

    const query = {
      ...(this.catalogQuery.staticParameters ?? {}),
      [this.catalogQuery.codigoParameter]: normalizedCode,
    };

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

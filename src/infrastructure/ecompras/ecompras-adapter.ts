import type { CatalogItem, CatalogLookupResult } from "@/src/domain/item/catalog-item";

/** Data prepared for the e-ComprasDF item-inclusion boundary. */
export interface ItemInclusionContext {
  itemId: number;
}

/** Payload accepted by the integration boundary once the real contract is verified. */
export interface ItemSubmission {
  itemId: number;
  descricao: string;
  unidade: string;
  observacao?: string;
}

/** Result returned by an item submission attempt. */
export interface ItemSubmissionResult {
  confirmed: boolean;
  message: string;
}

/**
 * Abstraction over the e-ComprasDF integration.
 *
 * Application code depends on this contract instead of Playwright, HTTP or
 * portal-specific DOM details. The real transport implementation can therefore
 * evolve without changing the PCA domain/application layers.
 */
export interface EComprasAdapter {
  /**
   * Search the e-ComprasDF catalog using the catalog code.
   *
   * All candidates are returned. Ambiguity is deliberately handled by
   * ItemResolver rather than being silently resolved here.
   */
  buscarItemPorCodigo(codigoCatalogo: string): Promise<CatalogLookupResult>;

  /**
   * Prepare access to the item-inclusion form for an already resolved ItemId.
   *
   * Request/session details remain undefined until captured from the real portal.
   */
  prepareItemInclusion(itemId: CatalogItem["itemId"]): Promise<ItemInclusionContext>;

  /**
   * Submit a prepared item.
   *
   * This method exists as an explicit integration boundary, but production use
   * remains disabled until the real POST, response and confirmation semantics
   * are verified against the e-ComprasDF.
   */
  submitItem(data: ItemSubmission): Promise<ItemSubmissionResult>;
}

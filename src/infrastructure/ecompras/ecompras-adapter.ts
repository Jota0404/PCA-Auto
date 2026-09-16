import type { CatalogItem, CatalogLookupResult } from "@/src/domain/item/catalog-item";

/**
 * Abstraction over the e-ComprasDF integration.
 *
 * Application code must depend on this contract rather than on Playwright,
 * HTTP clients or portal-specific DOM details. This keeps the portal boundary
 * replaceable when the integration strategy changes.
 */
export interface EComprasAdapter {
  /**
   * Search the e-ComprasDF catalog using the catalog code.
   *
   * The adapter returns all candidates. It must not silently choose between
   * ambiguous results; that decision belongs to ItemResolver.
   */
  buscarItemPorCodigo(codigoCatalogo: string): Promise<CatalogLookupResult>;

  /**
   * Prepare access to the item inclusion form for a resolved ItemId.
   *
   * The concrete request/session details are intentionally not defined here
   * until the real e-ComprasDF POST and authenticated-session behavior are
   * captured and verified.
   */
  abrirFormularioInclusao(itemId: CatalogItem["itemId"]): Promise<void>;
}

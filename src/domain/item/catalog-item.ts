/**
 * Minimal catalog representation required by the PCA Auto domain.
 *
 * These fields are based only on values already confirmed during the e-Compras
 * investigation: catalog code, internal ItemId, description and unit.
 */
export interface CatalogItem {
  codigoCatalogo: string;
  itemId: number;
  descricao: string;
  unidade: string;
}

/**
 * Result returned by a catalog lookup before ambiguity is resolved.
 */
export interface CatalogLookupResult {
  items: CatalogItem[];
}

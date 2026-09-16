import type { CatalogItem } from "@/src/domain/item/catalog-item";

/**
 * Persistence boundary required by the item resolver.
 *
 * Keeping this contract separate from Prisma lets application tests exercise
 * resolution logic without requiring a live database connection.
 */
export interface CatalogItemRepositoryPort {
  findByCodigo(codigoCatalogo: string): Promise<CatalogItem | null>;
  save(item: CatalogItem): Promise<CatalogItem>;
}

import { prisma } from "@/src/infrastructure/db/prisma";
import type { CatalogItem } from "@/src/domain/item/catalog-item";

/**
 * Persistence boundary for the small local e-ComprasDF catalog cache.
 *
 * The cache stores only items that the application actually resolves; it does
 * not attempt to mirror the full portal catalog.
 */
export class CatalogItemRepository {
  async findByCodigo(codigoCatalogo: string): Promise<CatalogItem | null> {
    const item = await prisma.catalogItem.findUnique({
      where: { codigoCatalogo },
    });

    return item
      ? {
          codigoCatalogo: item.codigoCatalogo,
          itemId: item.itemId,
          descricao: item.descricao,
          unidade: item.unidade,
        }
      : null;
  }

  async save(item: CatalogItem): Promise<CatalogItem> {
    const saved = await prisma.catalogItem.upsert({
      where: { codigoCatalogo: item.codigoCatalogo },
      create: item,
      update: {
        itemId: item.itemId,
        descricao: item.descricao,
        unidade: item.unidade,
      },
    });

    return {
      codigoCatalogo: saved.codigoCatalogo,
      itemId: saved.itemId,
      descricao: saved.descricao,
      unidade: saved.unidade,
    };
  }
}

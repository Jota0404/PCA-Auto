import { describe, expect, it } from "vitest";
import { ItemResolutionError, ItemResolver } from "@/src/application/items/item-resolver";
import type { CatalogItem } from "@/src/domain/item/catalog-item";
import type { EComprasAdapter } from "@/src/infrastructure/ecompras/ecompras-adapter";

class FakeCatalogRepository {
  private cached: CatalogItem | null;

  constructor(cached: CatalogItem | null = null) {
    this.cached = cached;
  }

  async findByCodigo(): Promise<CatalogItem | null> {
    return this.cached;
  }

  async save(item: CatalogItem): Promise<CatalogItem> {
    this.cached = item;
    return item;
  }
}

function adapterWith(
  items: Awaited<ReturnType<EComprasAdapter["buscarItemPorCodigo"]>>["items"],
): EComprasAdapter {
  return {
    async buscarItemPorCodigo() {
      return { items };
    },
    async prepareItemInclusion(itemId: number) {
      return { itemId };
    },
    async submitItem() {
      return {
        confirmed: false,
        message: "Não utilizado neste teste.",
      };
    },
  };
}

describe("ItemResolver", () => {
  const validItem = {
    codigoCatalogo: "ITEM-001",
    itemId: 8935,
    descricao: "Item de teste",
    unidade: "UN",
  };

  it("returns the only exact catalog match", async () => {
    const resolver = new ItemResolver(adapterWith([validItem]), new FakeCatalogRepository());

    await expect(resolver.resolve("ITEM-001")).resolves.toEqual(validItem);
  });

  it("blocks when no item is found", async () => {
    const resolver = new ItemResolver(adapterWith([]), new FakeCatalogRepository());

    await expect(resolver.resolve("ITEM-001")).rejects.toBeInstanceOf(
      ItemResolutionError,
    );
  });

  it("blocks ambiguous results", async () => {
    const resolver = new ItemResolver(
      adapterWith([validItem, { ...validItem, itemId: 9999 }]),
      new FakeCatalogRepository(),
    );

    await expect(resolver.resolve("ITEM-001")).rejects.toThrow(
      "Mais de um item encontrado",
    );
  });

  it("blocks invalid ItemId", async () => {
    const resolver = new ItemResolver(
      adapterWith([{ ...validItem, itemId: 0 }]),
      new FakeCatalogRepository(),
    );

    await expect(resolver.resolve("ITEM-001")).rejects.toThrow(
      "ItemId inválido",
    );
  });

  it("blocks missing description or unit", async () => {
    const resolver = new ItemResolver(
      adapterWith([{ ...validItem, descricao: "" }]),
      new FakeCatalogRepository(),
    );

    await expect(resolver.resolve("ITEM-001")).rejects.toThrow(
      "Descrição ausente",
    );
  });
});

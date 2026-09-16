import { describe, expect, it } from "vitest";
import { ItemResolutionError, ItemResolver } from "@/src/application/items/item-resolver";
import type { EComprasAdapter } from "@/src/infrastructure/ecompras/ecompras-adapter";
import type { CatalogItem } from "@/src/domain/item/catalog-item";
import type { CatalogItemRepositoryPort } from "@/src/infrastructure/db/catalog-item-repository-interface";

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

function emptyRepository(): CatalogItemRepositoryPort {
  return {
    async findByCodigo() {
      return null;
    },
    async save(item: CatalogItem) {
      return item;
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
    const resolver = new ItemResolver(
      adapterWith([validItem]),
      emptyRepository(),
    );

    await expect(resolver.resolve("ITEM-001")).resolves.toEqual(validItem);
  });

  it("blocks when no item is found", async () => {
    const resolver = new ItemResolver(adapterWith([]), emptyRepository());

    await expect(resolver.resolve("ITEM-001")).rejects.toBeInstanceOf(
      ItemResolutionError,
    );
  });

  it("blocks ambiguous results", async () => {
    const resolver = new ItemResolver(
      adapterWith([validItem, { ...validItem, itemId: 9999 }]),
      emptyRepository(),
    );

    await expect(resolver.resolve("ITEM-001")).rejects.toThrow(
      "Mais de um item encontrado",
    );
  });

  it("blocks invalid ItemId", async () => {
    const resolver = new ItemResolver(
      adapterWith([{ ...validItem, itemId: 0 }]),
      emptyRepository(),
    );

    await expect(resolver.resolve("ITEM-001")).rejects.toThrow(
      "ItemId inválido",
    );
  });

  it("blocks missing description or unit", async () => {
    const resolver = new ItemResolver(
      adapterWith([{ ...validItem, descricao: "" }]),
      emptyRepository(),
    );

    await expect(resolver.resolve("ITEM-001")).rejects.toThrow(
      "Descrição ausente",
    );
  });
});

import { describe, expect, it } from "vitest";
import { ItemResolutionError, ItemResolver } from "@/src/application/items/item-resolver";
import type { EComprasAdapter } from "@/src/infrastructure/ecompras/ecompras-adapter";

function adapterWith(items: Awaited<ReturnType<EComprasAdapter["buscarItemPorCodigo"]>>["items"]): EComprasAdapter {
  return {
    async buscarItemPorCodigo() {
      return { items };
    },
    async abrirFormularioInclusao() {
      return undefined;
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
    const resolver = new ItemResolver(adapterWith([validItem]));

    await expect(resolver.resolve("ITEM-001")).resolves.toEqual(validItem);
  });

  it("blocks when no item is found", async () => {
    const resolver = new ItemResolver(adapterWith([]));

    await expect(resolver.resolve("ITEM-001")).rejects.toBeInstanceOf(
      ItemResolutionError,
    );
  });

  it("blocks ambiguous results", async () => {
    const resolver = new ItemResolver(
      adapterWith([validItem, { ...validItem, itemId: 9999 }]),
    );

    await expect(resolver.resolve("ITEM-001")).rejects.toThrow(
      "Mais de um item encontrado",
    );
  });

  it("blocks invalid ItemId", async () => {
    const resolver = new ItemResolver(
      adapterWith([{ ...validItem, itemId: 0 }]),
    );

    await expect(resolver.resolve("ITEM-001")).rejects.toThrow(
      "ItemId inválido",
    );
  });

  it("blocks missing description or unit", async () => {
    const resolver = new ItemResolver(
      adapterWith([{ ...validItem, descricao: "" }]),
    );

    await expect(resolver.resolve("ITEM-001")).rejects.toThrow(
      "Descrição ausente",
    );
  });
});

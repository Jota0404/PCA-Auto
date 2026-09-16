import { describe, expect, it } from "vitest";
import { ItemResolutionError, ItemResolver } from "./item-resolver";
import type { CatalogItem } from "@/src/domain/item/catalog-item";
import type { EComprasAdapter } from "@/src/infrastructure/ecompras/ecompras-adapter";

class FakeCatalogRepository {
  constructor(private cached: CatalogItem | null = null) {}

  async findByCodigo(): Promise<CatalogItem | null> {
    return this.cached;
  }

  async save(item: CatalogItem): Promise<CatalogItem> {
    this.cached = item;
    return item;
  }
}

function adapter(items: CatalogItem[]): EComprasAdapter {
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
  const validItem: CatalogItem = {
    codigoCatalogo: "3.3.90.30.01.00.002.8935",
    itemId: 8935,
    descricao: "Óleo mineral para motores",
    unidade: "Caixa",
  };

  it("usa o cache local sem consultar o portal", async () => {
    const fakeAdapter = adapter([]);
    const resolver = new ItemResolver(fakeAdapter, new FakeCatalogRepository(validItem));

    await expect(resolver.resolve(validItem.codigoCatalogo)).resolves.toEqual(validItem);
  });

  it("persiste um único resultado confirmado", async () => {
    const repository = new FakeCatalogRepository();
    const resolver = new ItemResolver(adapter([validItem]), repository);

    await expect(resolver.resolve(validItem.codigoCatalogo)).resolves.toEqual(validItem);
    await expect(repository.findByCodigo()).resolves.toEqual(validItem);
  });

  it("bloqueia resultados ambíguos", async () => {
    const resolver = new ItemResolver(adapter([validItem, { ...validItem, itemId: 9999 }]));

    await expect(resolver.resolve(validItem.codigoCatalogo)).rejects.toBeInstanceOf(
      ItemResolutionError,
    );
  });
});

import type { CatalogItem } from "@/src/domain/item/catalog-item";
import type { EComprasAdapter } from "@/src/infrastructure/ecompras/ecompras-adapter";
import { CatalogItemRepository } from "@/src/infrastructure/db/catalog-item-repository";
import type { CatalogItemRepositoryPort } from "@/src/infrastructure/db/catalog-item-repository-interface";

export class ItemResolutionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ItemResolutionError";
  }
}

/**
 * Resolves a catalog code into exactly one validated catalog item.
 *
 * Resolution first checks the local cache. A portal lookup is only required
 * when the item is not already known. Ambiguous or incomplete portal results
 * are treated as errors and never selected automatically.
 */
export class ItemResolver {
  constructor(
    private readonly eCompras: EComprasAdapter,
    private readonly catalogRepository: CatalogItemRepositoryPort = new CatalogItemRepository(),
  ) {}

  async resolve(codigoCatalogo: string): Promise<CatalogItem> {
    const codigo = codigoCatalogo.trim();

    if (!codigo) {
      throw new ItemResolutionError("Código de catálogo não informado.");
    }

    const cached = await this.catalogRepository.findByCodigo(codigo);
    if (cached) {
      this.validateItem(cached, codigo);
      return cached;
    }

    const result = await this.eCompras.buscarItemPorCodigo(codigo);

    if (result.items.length === 0) {
      throw new ItemResolutionError(
        `Nenhum item encontrado para o código ${codigo}.`,
      );
    }

    if (result.items.length > 1) {
      throw new ItemResolutionError(
        `Mais de um item encontrado para o código ${codigo}.`,
      );
    }

    const [item] = result.items;
    this.validateItem(item, codigo);

    return this.catalogRepository.save(item);
  }

  private validateItem(item: CatalogItem, codigo: string): void {
    if (item.codigoCatalogo !== codigo) {
      throw new ItemResolutionError(
        `O resultado retornado não corresponde ao código solicitado: ${codigo}.`,
      );
    }

    if (!Number.isInteger(item.itemId) || item.itemId <= 0) {
      throw new ItemResolutionError(`ItemId inválido para o código ${codigo}.`);
    }

    if (!item.descricao.trim()) {
      throw new ItemResolutionError(`Descrição ausente para o código ${codigo}.`);
    }

    if (!item.unidade.trim()) {
      throw new ItemResolutionError(`Unidade ausente para o código ${codigo}.`);
    }
  }
}

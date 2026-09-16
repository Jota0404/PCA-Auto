import type { CatalogItem } from "@/src/domain/item/catalog-item";
import type { EComprasAdapter } from "@/src/infrastructure/ecompras/ecompras-adapter";

export class ItemResolutionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ItemResolutionError";
  }
}

/**
 * Resolves a PCA catalog code into one and only one catalog item.
 *
 * The resolver deliberately treats zero or multiple candidates as errors.
 * Automatic selection from ambiguous catalog results is unsafe for the MVP.
 */
export class ItemResolver {
  constructor(private readonly eCompras: EComprasAdapter) {}

  async resolve(codigoCatalogo: string): Promise<CatalogItem> {
    const codigo = codigoCatalogo.trim();

    if (!codigo) {
      throw new ItemResolutionError("Código de catálogo não informado.");
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

    if (item.codigoCatalogo !== codigo) {
      throw new ItemResolutionError(
        `O resultado retornado não corresponde ao código solicitado: ${codigo}.`,
      );
    }

    if (!Number.isInteger(item.itemId) || item.itemId <= 0) {
      throw new ItemResolutionError(
        `ItemId inválido para o código ${codigo}.`,
      );
    }

    if (!item.descricao.trim()) {
      throw new ItemResolutionError(
        `Descrição ausente para o código ${codigo}.`,
      );
    }

    if (!item.unidade.trim()) {
      throw new ItemResolutionError(`Unidade ausente para o código ${codigo}.`);
    }

    return item;
  }
}

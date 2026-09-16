import type { CatalogLookupResult } from "@/src/domain/item/catalog-item";
import type { EComprasAdapter } from "./ecompras-adapter";

/**
 * Deterministic adapter used while the real e-ComprasDF request/response
 * contract is still being verified.
 *
 * It allows the application flow to be developed and tested without sending
 * data to the official system.
 */
export class MockEComprasAdapter implements EComprasAdapter {
  constructor(private readonly catalog: CatalogLookupResult = { items: [] }) {}

  async buscarItemPorCodigo(
    codigoCatalogo: string,
  ): Promise<CatalogLookupResult> {
    return {
      items: this.catalog.items.filter(
        (item) => item.codigoCatalogo === codigoCatalogo,
      ),
    };
  }

  async abrirFormularioInclusao(itemId: number): Promise<void> {
    // In simulation mode this only proves that the resolved ItemId reached
    // the integration boundary. No network call is performed.
    if (!Number.isInteger(itemId) || itemId <= 0) {
      throw new Error("ItemId inválido.");
    }
  }
}

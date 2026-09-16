import type {
  CatalogLookupResult,
} from "@/src/domain/item/catalog-item";
import type {
  EComprasAdapter,
  ItemInclusionContext,
  ItemSubmission,
  ItemSubmissionResult,
} from "./ecompras-adapter";

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

  async prepareItemInclusion(itemId: number): Promise<ItemInclusionContext> {
    if (!Number.isInteger(itemId) || itemId <= 0) {
      throw new Error("ItemId inválido.");
    }

    return { itemId };
  }

  async submitItem(data: ItemSubmission): Promise<ItemSubmissionResult> {
    if (!Number.isInteger(data.itemId) || data.itemId <= 0) {
      throw new Error("ItemId inválido.");
    }

    // Production submission is intentionally not simulated as a success. A
    // caller using the mock must explicitly remain in SIMULATION mode.
    return {
      confirmed: false,
      message:
        "Mock adapter não envia dados ao e-ComprasDF. Use SIMULATION enquanto a integração real não estiver validada.",
    };
  }
}

import type { CatalogItem } from "@/src/domain/item/catalog-item";
import { ItemResolver } from "@/src/application/items/item-resolver";

export type ExecutionMode = "SIMULATION" | "PRODUCTION";

export type SingleItemExecutionResult = {
  mode: ExecutionMode;
  status: "COMPLETED";
  item: CatalogItem;
};

/**
 * First controlled execution flow of PCA Auto.
 *
 * The executor currently stops at the integration boundary. In simulation it
 * resolves and validates one item without altering the e-ComprasDF. The real
 * production submission will only be implemented after the portal POST and
 * response contract have been captured and verified.
 */
export class SingleItemExecutor {
  constructor(private readonly itemResolver: ItemResolver) {}

  async execute(
    codigoCatalogo: string,
    mode: ExecutionMode = "SIMULATION",
  ): Promise<SingleItemExecutionResult> {
    const item = await this.itemResolver.resolve(codigoCatalogo);

    if (mode === "SIMULATION") {
      return {
        mode,
        status: "COMPLETED",
        item,
      };
    }

    throw new Error(
      "Execução PRODUCTION ainda está bloqueada até a integração real ser validada.",
    );
  }
}

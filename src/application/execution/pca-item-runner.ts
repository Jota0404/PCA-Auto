import type { EComprasAdapter } from "@/src/infrastructure/ecompras/ecompras-adapter";
import type { PcaItem } from "@/src/domain/pca/pca-item";
import type { ItemRepository, ExecutionLogger } from "./execution-service";
import { SingleItemExecutionService } from "./execution-service";

/**
 * Coordinates the persisted execution of one PcaItem.
 *
 * This thin wrapper keeps the orchestration explicit and makes it easy to
 * expose the same flow from a future API route or background runner.
 */
export class PcaItemRunner {
  public constructor(
    resolver: ConstructorParameters<typeof SingleItemExecutionService>[0],
    adapter: EComprasAdapter,
    repository: ItemRepository,
    logger: ExecutionLogger,
  ) {
    this.service = new SingleItemExecutionService(
      resolver,
      adapter,
      repository,
      logger,
    );
  }

  private readonly service: SingleItemExecutionService;

  /** Execute one persisted item in simulation or production mode. */
  public run(item: PcaItem, mode: "SIMULATION" | "PRODUCTION" = "SIMULATION") {
    return this.service.execute(item, mode);
  }
}

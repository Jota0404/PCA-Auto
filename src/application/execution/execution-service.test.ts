import { describe, expect, it } from "vitest";
import { SingleItemExecutionService } from "./execution-service";
import { InMemoryExecutionLogger } from "./execution-logger";
import { MockEComprasAdapter } from "@/src/infrastructure/ecompras/mock-ecompras-adapter";
import type { PcaItem } from "@/src/domain/pca/pca-item";

const item: PcaItem = {
  id: 1,
  pcaId: 1,
  codigoCatalogo: "3.3.90.30.01.00.002.8935",
  descricao: "Óleo mineral para motores",
  unidade: "20",
};

describe("SingleItemExecutionService", () => {
  it("prepara um item em modo simulação sem submetê-lo", async () => {
    const adapter = new MockEComprasAdapter({
      items: [
        {
          codigoCatalogo: item.codigoCatalogo,
          itemId: 8935,
          descricao: "Óleo mineral para motores",
          unidade: "20",
        },
      ],
    });

    const resolver = {
      resolve: async () => ({
        itemId: 8935,
        descricao: "Óleo mineral para motores",
        unidade: "20",
      }),
    };

    const repository = {
      markInProgress: async () => undefined,
      markCompleted: async () => undefined,
      markError: async () => undefined,
    };

    const logger = new InMemoryExecutionLogger();
    const service = new SingleItemExecutionService(
      resolver,
      adapter,
      repository,
      logger,
    );

    const result = await service.execute(item, "SIMULATION");

    expect(result.success).toBe(true);
    expect(result.itemId).toBe(8935);
    expect(result.stage).toBe("SIMULATION");
    expect(logger.entriesSnapshot().map((entry) => entry.stage)).toEqual([
      "ITEM_STARTED",
      "ITEM_RESOLVED",
      "FORM_PREPARED",
      "SIMULATION",
    ]);
  });
});

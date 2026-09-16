import { describe, expect, it } from "vitest";
import type { PcaItem } from "@/src/domain/pca/pca-item";
import { MockEComprasAdapter } from "@/src/infrastructure/ecompras/mock-ecompras-adapter";
import { InMemoryExecutionLogger } from "./execution-logger";
import { PcaItemRunner } from "./pca-item-runner";

const item: PcaItem = {
  id: 31,
  pcaId: 7,
  codigoCatalogo: "3.3.90.30.01.00.002.8935",
  descricao: "Óleo mineral para motores",
  unidade: "20",
};

describe("PcaItemRunner", () => {
  it("executa exatamente um item em simulação e registra as etapas", async () => {
    const adapter = new MockEComprasAdapter({
      items: [
        {
          codigoCatalogo: item.codigoCatalogo,
          itemId: 8935,
          descricao: item.descricao!,
          unidade: item.unidade!,
        },
      ],
    });

    const resolver = {
      resolve: async () => ({
        itemId: 8935,
        descricao: item.descricao!,
        unidade: item.unidade!,
      }),
    };

    const states: string[] = [];
    const repository = {
      markInProgress: async () => {
        states.push("IN_PROGRESS");
      },
      markCompleted: async () => {
        states.push("COMPLETED");
      },
      markError: async () => {
        states.push("ERROR");
      },
    };

    const logger = new InMemoryExecutionLogger();
    const runner = new PcaItemRunner(resolver, adapter, repository, logger);

    const result = await runner.run(item, "SIMULATION");

    expect(result.success).toBe(true);
    expect(result.stage).toBe("SIMULATION");
    expect(states).toEqual(["IN_PROGRESS"]);
    expect(logger.entriesSnapshot().at(-1)?.stage).toBe("SIMULATION");
  });
});

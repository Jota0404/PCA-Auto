import { prisma } from "./prisma";
import type { ItemRepository } from "@/src/application/execution/execution-service";

/**
 * Prisma-backed repository for the execution state of PCA items.
 *
 * Keeping persistence behind a small interface allows the application service
 * to be tested independently of PostgreSQL.
 */
export class PrismaPcaItemRepository implements ItemRepository {
  async markInProgress(id: number): Promise<void> {
    await prisma.pcaItem.update({
      where: { id },
      data: {
        statusExecucao: "IN_PROGRESS",
        mensagemErro: null,
      },
    });
  }

  async markCompleted(id: number, itemId: number): Promise<void> {
    await prisma.pcaItem.update({
      where: { id },
      data: {
        itemId,
        statusExecucao: "COMPLETED",
        mensagemErro: null,
      },
    });
  }

  async markError(id: number, message: string): Promise<void> {
    await prisma.pcaItem.update({
      where: { id },
      data: {
        statusExecucao: "ERROR",
        mensagemErro: message,
      },
    });
  }
}

import { prisma } from "@/src/infrastructure/db/prisma";
import type { ExecutionLogger } from "@/src/application/execution/execution-service";

/**
 * Persists execution stages in the execution history table.
 *
 * The logger receives the execution and PCA item identifiers explicitly so a
 * message can be traced back to the exact run and item that produced it.
 */
export class PrismaExecutionLogger implements ExecutionLogger {
  constructor(
    private readonly executionId: number,
    private readonly pcaItemId: number,
  ) {}

  async step(stage: string, message: string): Promise<void> {
    await prisma.executionItem.create({
      data: {
        executionId: this.executionId,
        pcaItemId: this.pcaItemId,
        status: "INFO",
        etapa: stage,
        mensagem: message,
      },
    });
  }

  async error(stage: string, message: string): Promise<void> {
    await prisma.executionItem.create({
      data: {
        executionId: this.executionId,
        pcaItemId: this.pcaItemId,
        status: "ERROR",
        etapa: stage,
        mensagem: message,
      },
    });
  }
}

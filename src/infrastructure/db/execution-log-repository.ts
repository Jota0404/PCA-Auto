import { prisma } from "./prisma";
import type { ExecutionLogger } from "@/src/application/execution/execution-service";

/**
 * Persists execution steps in `ExecutionItem`.
 *
 * The MVP keeps the log model intentionally simple: one row per relevant
 * execution event, with a stage, status and human-readable message.
 */
export class PrismaExecutionLogger implements ExecutionLogger {
  public constructor(
    private readonly executionId: number,
    private readonly pcaItemId: number,
  ) {}

  async step(stage: string, message: string): Promise<void> {
    await this.write("INFO", stage, message);
  }

  async error(stage: string, message: string): Promise<void> {
    await this.write("ERROR", stage, message);
  }

  private async write(
    status: string,
    etapa: string,
    mensagem: string,
  ): Promise<void> {
    await prisma.executionItem.create({
      data: {
        executionId: this.executionId,
        pcaItemId: this.pcaItemId,
        status,
        etapa,
        mensagem,
      },
    });
  }
}

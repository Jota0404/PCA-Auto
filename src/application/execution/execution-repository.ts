import { prisma } from "@/src/infrastructure/db/prisma";
import type { ExecutionStatus } from "@prisma/client";

/**
 * Creates and finalizes an execution batch.
 *
 * Batch accounting is kept outside the item executor so a future retry can
 * create a new execution record without altering the historical run.
 */
export class PrismaExecutionRepository {
  async create(pcaId: number, totalItens: number): Promise<number> {
    const execution = await prisma.execution.create({
      data: {
        pcaId,
        totalItens,
        status: "CREATED",
      },
      select: { id: true },
    });

    return execution.id;
  }

  async start(id: number): Promise<void> {
    await prisma.execution.update({
      where: { id },
      data: { status: "RUNNING" },
    });
  }

  async finish(
    id: number,
    status: ExecutionStatus,
    itensSucesso: number,
    itensErro: number,
  ): Promise<void> {
    await prisma.execution.update({
      where: { id },
      data: {
        status,
        itensSucesso,
        itensErro,
        fim: new Date(),
      },
    });
  }
}

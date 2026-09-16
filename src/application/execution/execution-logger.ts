/**
 * Minimal application-level logger abstraction.
 *
 * The logger is intentionally independent from the database so the same
 * execution service can be tested with an in-memory implementation and later
 * persisted through Prisma.
 */
import type { ExecutionLogger } from "./execution-service";

export class InMemoryExecutionLogger implements ExecutionLogger {
  private readonly entries: Array<{ stage: string; message: string; at: Date }> = [];

  public async step(stage: string, message: string): Promise<void> {
    this.entries.push({ stage, message, at: new Date() });
  }

  public async error(stage: string, message: string): Promise<void> {
    this.entries.push({ stage, message, at: new Date() });
  }

  public entriesSnapshot(): ReadonlyArray<{ stage: string; message: string; at: Date }> {
    return [...this.entries];
  }
}

/**
 * Application service responsible for running a single PCA item.
 *
 * The service deliberately persists each significant step through the
 * execution repository/logger so an interrupted run can be inspected and
 * resumed later. The first MVP only enables the controlled simulation mode.
 */
import type { EComprasAdapter } from "@/infrastructure/ecompras/ecompras-adapter";
import type { PcaItem } from "@/domain/pca/pca-item";

export type ExecutionMode = "SIMULATION" | "PRODUCTION";

export type ExecutionResult = {
  success: boolean;
  itemId?: number;
  stage: string;
  message: string;
};

export interface ExecutionLogger {
  step(stage: string, message: string): Promise<void>;
  error(stage: string, message: string): Promise<void>;
}

export interface ItemRepository {
  markInProgress(id: number): Promise<void>;
  markCompleted(id: number, itemId: number): Promise<void>;
  markError(id: number, message: string): Promise<void>;
}

export interface ItemResolver {
  resolve(codigoCatalogo: string): Promise<{
    itemId: number;
    descricao: string;
    unidade: string;
  }>;
}

export class SingleItemExecutionService {
  public constructor(
    private readonly resolver: ItemResolver,
    private readonly adapter: EComprasAdapter,
    private readonly repository: ItemRepository,
    private readonly logger: ExecutionLogger,
  ) {}

  /**
   * Executes exactly one item. Production mode remains intentionally guarded
   * until the real e-ComprasDF POST/confirmation flow has been verified.
   */
  public async execute(
    item: PcaItem,
    mode: ExecutionMode = "SIMULATION",
  ): Promise<ExecutionResult> {
    await this.repository.markInProgress(item.id);
    await this.logger.step("ITEM_STARTED", `Item ${item.id} iniciado.`);

    try {
      const resolved = await this.resolver.resolve(item.codigoCatalogo);
      await this.logger.step(
        "ITEM_RESOLVED",
        `Código ${item.codigoCatalogo} resolvido para ItemId ${resolved.itemId}.`,
      );

      const context = await this.adapter.prepareItemInclusion(resolved.itemId);
      await this.logger.step("FORM_PREPARED", "Contexto do formulário preparado.");

      if (mode === "SIMULATION") {
        await this.logger.step(
          "SIMULATION",
          "Execução interrompida antes do envio final (modo simulação).",
        );

        return {
          success: true,
          itemId: resolved.itemId,
          stage: "SIMULATION",
          message: "Fluxo preparado sem alteração no e-ComprasDF.",
        };
      }

      const result = await this.adapter.submitItem({
        ...context,
        descricao: item.descricao ?? resolved.descricao,
        unidade: item.unidade ?? resolved.unidade,
        observacao: item.mensagemErro ?? "",
      });

      if (!result.confirmed) {
        throw new Error(result.message || "O e-ComprasDF não confirmou a operação.");
      }

      await this.repository.markCompleted(item.id, resolved.itemId);
      await this.logger.step("ITEM_COMPLETED", "Item confirmado pelo executor.");

      return {
        success: true,
        itemId: resolved.itemId,
        stage: "COMPLETED",
        message: result.message,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro desconhecido.";
      await this.repository.markError(item.id, message);
      await this.logger.error("EXECUTION_ERROR", message);

      return {
        success: false,
        stage: "ERROR",
        message,
      };
    }
  }
}

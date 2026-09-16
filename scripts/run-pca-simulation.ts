import { prisma } from "@/src/infrastructure/db/prisma";
import { PrismaExecutionLogger } from "@/src/infrastructure/db/prisma-execution-logger";
import { PrismaExecutionRepository } from "@/src/application/execution/execution-repository";
import { PrismaPcaItemRepository } from "@/src/infrastructure/db/pca-item-repository";
import { ItemResolver } from "@/src/application/items/item-resolver";
import { PcaItemRunner } from "@/src/application/execution/pca-item-runner";
import { MockEComprasAdapter } from "@/src/infrastructure/ecompras/mock-ecompras-adapter";
import type { PcaItem } from "@/src/domain/pca/pca-item";

const SIMULATION_CODE = "PCA-AUTO-SIMULATION-001";
const SIMULATION_ITEM_ID = 900001;

/**
 * Runs one end-to-end simulation against the real local PostgreSQL database.
 *
 * The mock e-ComprasDF adapter is used deliberately. No request is sent to
 * the official portal. The script creates a fresh PCA, catalog cache entry,
 * execution record and execution log entries so the persisted flow can be
 * inspected with Prisma Studio or SQL.
 */
async function main(): Promise<void> {
  const catalogItem = await prisma.catalogItem.upsert({
    where: { codigoCatalogo: SIMULATION_CODE },
    create: {
      codigoCatalogo: SIMULATION_CODE,
      itemId: SIMULATION_ITEM_ID,
      descricao: "Item de simulação PCA-Auto",
      unidade: "UN",
    },
    update: {
      itemId: SIMULATION_ITEM_ID,
      descricao: "Item de simulação PCA-Auto",
      unidade: "UN",
    },
  });

  const pca = await prisma.pca.create({
    data: {
      ano: new Date().getFullYear(),
      unidade: "SIMULACAO",
      nome: `PCA Auto Simulation ${new Date().toISOString()}`,
      status: "DRAFT",
      items: {
        create: {
          codigoCatalogo: SIMULATION_CODE,
          catalogItemId: catalogItem.id,
          descricao: catalogItem.descricao,
          unidade: catalogItem.unidade,
          quantidade: 1,
          statusExecucao: "PENDING",
        },
      },
    },
    include: { items: true },
  });

  const createdItem = pca.items[0];
  if (!createdItem) {
    throw new Error("Não foi possível criar o item de simulação.");
  }

  const item: PcaItem = {
    id: createdItem.id,
    pcaId: createdItem.pcaId,
    codigoCatalogo: createdItem.codigoCatalogo,
    itemId: createdItem.itemId ?? undefined,
    descricao: createdItem.descricao ?? undefined,
    unidade: createdItem.unidade ?? undefined,
    quantidade: createdItem.quantidade ? Number(createdItem.quantidade) : undefined,
    valorEstimado: createdItem.valorEstimado
      ? Number(createdItem.valorEstimado)
      : undefined,
    dataDesejada: createdItem.dataDesejada ?? undefined,
    prioridade: createdItem.prioridade ?? undefined,
    modalidade: createdItem.modalidade ?? undefined,
  };

  const executionRepository = new PrismaExecutionRepository();
  const executionId = await executionRepository.create(pca.id, 1);
  await executionRepository.start(executionId);

  const logger = new PrismaExecutionLogger(executionId, item.id);
  const runner = new PcaItemRunner(
    new ItemResolver(new MockEComprasAdapter()),
    new MockEComprasAdapter(),
    new PrismaPcaItemRepository(),
    logger,
  );

  const result = await runner.run(item, "SIMULATION");

  const persistedItem = await prisma.pcaItem.findUnique({
    where: { id: item.id },
    select: { id: true, statusExecucao: true, itemId: true, mensagemErro: true },
  });

  const persistedLogs = await prisma.executionItem.findMany({
    where: { executionId, pcaItemId: item.id },
    orderBy: { id: "asc" },
    select: { etapa: true, status: true, mensagem: true },
  });

  console.log("\n=== PCA-AUTO SIMULATION ===");
  console.log(`PCA: ${pca.id}`);
  console.log(`Item: ${item.id}`);
  console.log(`Execução: ${executionId}`);
  console.log(`Resultado: ${result.success ? "SUCCESS" : "ERROR"}`);
  console.log(`Etapa final: ${result.stage}`);
  console.log(`Mensagem: ${result.message}`);
  console.log("Estado persistido do item:", persistedItem);
  console.log("Logs persistidos:", persistedLogs);
  console.log("===========================\n");
  console.log(
    "A simulação não marca o item como COMPLETED e não finaliza o envio ao e-ComprasDF, conforme o fluxo documentado.",
  );
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

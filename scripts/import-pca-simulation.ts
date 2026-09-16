import { readFile } from "node:fs/promises";
import { prisma } from "@/src/infrastructure/db/prisma";
import { ImportPca } from "@/src/application/pca/import-pca";
import { PrismaExecutionLogger } from "@/src/infrastructure/db/prisma-execution-logger";
import { PrismaExecutionRepository } from "@/src/application/execution/execution-repository";
import { PrismaPcaItemRepository } from "@/src/infrastructure/db/pca-item-repository";
import { ItemResolver } from "@/src/application/items/item-resolver";
import { PcaItemRunner } from "@/src/application/execution/pca-item-runner";
import { MockEComprasAdapter } from "@/src/infrastructure/ecompras/mock-ecompras-adapter";
import type { PcaItem } from "@/src/domain/pca/pca-item";

/**
 * Imports a real XLSX file into a draft PCA, then runs exactly the first
 * imported item in SIMULATION mode against the local PostgreSQL database.
 *
 * No request is sent to e-ComprasDF. The script is intended as the first
 * operator-facing end-to-end smoke test using an actual spreadsheet.
 */
async function main(): Promise<void> {
  const [filePath, anoArg, unidadeArg, nomeArg] = process.argv.slice(2);

  if (!filePath || !anoArg || !unidadeArg || !nomeArg) {
    throw new Error(
      "Uso: npm run import:pca:simulation -- <arquivo.xlsx> <ano> <unidade> <nome>",
    );
  }

  const ano = Number(anoArg);
  if (!Number.isInteger(ano)) {
    throw new Error(`Ano inválido: ${anoArg}`);
  }

  const arquivo = await readFile(filePath);
  const imported = await new ImportPca().execute({
    ano,
    unidade: unidadeArg,
    nome: nomeArg,
    arquivo,
  });

  const pca = await prisma.pca.findUnique({
    where: { id: imported.pcaId },
    include: { items: true },
  });

  if (!pca) {
    throw new Error(`PCA ${imported.pcaId} não encontrado após importação.`);
  }

  const firstItem = pca.items[0];
  if (!firstItem) {
    throw new Error(`PCA ${pca.id} foi criado sem itens.`);
  }

  const item: PcaItem = {
    id: firstItem.id,
    pcaId: firstItem.pcaId,
    codigoCatalogo: firstItem.codigoCatalogo,
    itemId: firstItem.itemId ?? undefined,
    descricao: firstItem.descricao ?? undefined,
    unidade: firstItem.unidade ?? undefined,
    quantidade: firstItem.quantidade === null ? undefined : Number(firstItem.quantidade),
    valorEstimado:
      firstItem.valorEstimado === null ? undefined : Number(firstItem.valorEstimado),
    dataDesejada: firstItem.dataDesejada ?? undefined,
    prioridade: firstItem.prioridade ?? undefined,
    modalidade: firstItem.modalidade ?? undefined,
  };

  const executionRepository = new PrismaExecutionRepository();
  const executionId = await executionRepository.create(pca.id, 1);
  await executionRepository.start(executionId);

  const adapter = new MockEComprasAdapter({ items: [] });
  const runner = new PcaItemRunner(
    new ItemResolver(adapter),
    adapter,
    new PrismaPcaItemRepository(),
    new PrismaExecutionLogger(executionId, item.id),
  );

  const result = await runner.run(item, "SIMULATION");

  const executionStatus = result.success ? "COMPLETED" : "ERROR";
  await executionRepository.finish(executionId, executionStatus, 0, result.success ? 0 : 1);

  const persistedItem = await prisma.pcaItem.findUnique({
    where: { id: item.id },
    select: {
      id: true,
      codigoCatalogo: true,
      statusExecucao: true,
      itemId: true,
      mensagemErro: true,
    },
  });

  const persistedExecution = await prisma.execution.findUnique({
    where: { id: executionId },
    select: {
      id: true,
      status: true,
      totalItens: true,
      itensSucesso: true,
      itensErro: true,
      fim: true,
    },
  });

  const persistedLogs = await prisma.executionItem.findMany({
    where: { executionId, pcaItemId: item.id },
    orderBy: { id: "asc" },
    select: { etapa: true, status: true, mensagem: true },
  });

  console.log("\n=== PCA-AUTO: IMPORT + SIMULATION ===");
  console.log(`Arquivo: ${filePath}`);
  console.log(`PCA: ${pca.id}`);
  console.log(`Itens importados: ${imported.totalItens}`);
  console.log(`Item simulado: ${item.id}`);
  console.log(`Código: ${item.codigoCatalogo}`);
  console.log(`Execução: ${executionId}`);
  console.log(`Resultado: ${result.success ? "SUCCESS" : "ERROR"}`);
  console.log(`Etapa final: ${result.stage}`);
  console.log(`Estado persistido do item:`, persistedItem);
  console.log(`Execução persistida:`, persistedExecution);
  console.log(`Logs persistidos:`, persistedLogs);
  console.log("===================================\n");
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

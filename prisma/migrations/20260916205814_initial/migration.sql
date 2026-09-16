-- CreateEnum
CREATE TYPE "PcaStatus" AS ENUM ('DRAFT', 'READY', 'RUNNING', 'COMPLETED', 'BLOCKED', 'ERROR');

-- CreateEnum
CREATE TYPE "PcaItemStatus" AS ENUM ('PENDING', 'VALIDATED', 'IN_PROGRESS', 'COMPLETED', 'ERROR');

-- CreateEnum
CREATE TYPE "ExecutionStatus" AS ENUM ('CREATED', 'RUNNING', 'COMPLETED', 'PARTIAL', 'ERROR');

-- CreateTable
CREATE TABLE "pca" (
    "id" SERIAL NOT NULL,
    "ano" INTEGER NOT NULL,
    "unidade" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "status" "PcaStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "catalog_item" (
    "id" SERIAL NOT NULL,
    "codigoCatalogo" TEXT NOT NULL,
    "itemId" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "unidade" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "catalog_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pca_item" (
    "id" SERIAL NOT NULL,
    "pcaId" INTEGER NOT NULL,
    "catalogItemId" INTEGER,
    "codigoCatalogo" TEXT NOT NULL,
    "itemId" INTEGER,
    "descricao" TEXT,
    "unidade" TEXT,
    "quantidade" DECIMAL(65,30),
    "valorEstimado" DECIMAL(65,30),
    "dataDesejada" TIMESTAMP(3),
    "prioridade" TEXT,
    "modalidade" TEXT,
    "statusExecucao" "PcaItemStatus" NOT NULL DEFAULT 'PENDING',
    "mensagemErro" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pca_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "execucao" (
    "id" SERIAL NOT NULL,
    "pcaId" INTEGER NOT NULL,
    "inicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fim" TIMESTAMP(3),
    "status" "ExecutionStatus" NOT NULL DEFAULT 'CREATED',
    "totalItens" INTEGER NOT NULL DEFAULT 0,
    "itensSucesso" INTEGER NOT NULL DEFAULT 0,
    "itensErro" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "execucao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "execucao_item" (
    "id" SERIAL NOT NULL,
    "executionId" INTEGER NOT NULL,
    "pcaItemId" INTEGER NOT NULL,
    "inicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fim" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "etapa" TEXT NOT NULL,
    "mensagem" TEXT,

    CONSTRAINT "execucao_item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "pca_ano_idx" ON "pca"("ano");

-- CreateIndex
CREATE INDEX "pca_status_idx" ON "pca"("status");

-- CreateIndex
CREATE UNIQUE INDEX "catalog_item_codigoCatalogo_key" ON "catalog_item"("codigoCatalogo");

-- CreateIndex
CREATE INDEX "catalog_item_itemId_idx" ON "catalog_item"("itemId");

-- CreateIndex
CREATE INDEX "pca_item_pcaId_idx" ON "pca_item"("pcaId");

-- CreateIndex
CREATE INDEX "pca_item_codigoCatalogo_idx" ON "pca_item"("codigoCatalogo");

-- CreateIndex
CREATE INDEX "pca_item_statusExecucao_idx" ON "pca_item"("statusExecucao");

-- CreateIndex
CREATE INDEX "execucao_pcaId_idx" ON "execucao"("pcaId");

-- CreateIndex
CREATE INDEX "execucao_status_idx" ON "execucao"("status");

-- CreateIndex
CREATE INDEX "execucao_item_executionId_idx" ON "execucao_item"("executionId");

-- CreateIndex
CREATE INDEX "execucao_item_pcaItemId_idx" ON "execucao_item"("pcaItemId");

-- CreateIndex
CREATE INDEX "execucao_item_status_idx" ON "execucao_item"("status");

-- AddForeignKey
ALTER TABLE "pca_item" ADD CONSTRAINT "pca_item_pcaId_fkey" FOREIGN KEY ("pcaId") REFERENCES "pca"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pca_item" ADD CONSTRAINT "pca_item_catalogItemId_fkey" FOREIGN KEY ("catalogItemId") REFERENCES "catalog_item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "execucao" ADD CONSTRAINT "execucao_pcaId_fkey" FOREIGN KEY ("pcaId") REFERENCES "pca"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "execucao_item" ADD CONSTRAINT "execucao_item_executionId_fkey" FOREIGN KEY ("executionId") REFERENCES "execucao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "execucao_item" ADD CONSTRAINT "execucao_item_pcaItemId_fkey" FOREIGN KEY ("pcaItemId") REFERENCES "pca_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

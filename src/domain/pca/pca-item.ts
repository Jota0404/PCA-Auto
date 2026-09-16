/**
 * Domain representation of a PCA line item.
 *
 * Nullable fields reflect the staged workflow: a newly imported item may not
 * yet have a resolved catalog ItemId or all optional PCA values populated.
 */
export interface PcaItem {
  id: number;
  pcaId: number;
  codigoCatalogo: string;
  itemId?: number;
  descricao?: string;
  unidade?: string;
  quantidade?: number;
  valorEstimado?: number;
  dataDesejada?: Date;
  prioridade?: string;
  modalidade?: string;
}

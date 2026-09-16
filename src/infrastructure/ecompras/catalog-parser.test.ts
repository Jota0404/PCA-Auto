import { describe, expect, it } from "vitest";
import { CatalogParserError, validateCatalogCandidate } from "./catalog-parser";

describe("catalog parser", () => {
  it("rejects an invalid ItemId", () => {
    expect(() =>
      validateCatalogCandidate({
        codigoCatalogo: "CODIGO",
        itemId: 0,
        descricao: "Descrição",
        unidade: "Unidade",
      }),
    ).toThrow(CatalogParserError);
  });

  it("does not invent HTML selectors before they are confirmed", () => {
    expect(() =>
      require("./catalog-parser").parseCatalogHtml("<html></html>", {
        resultRow: "tr",
        codigo: "td.codigo",
        itemId: "td.item",
        descricao: "td.descricao",
        unidade: "td.unidade",
      }),
    ).toThrow(/seletores reais/);
  });
});

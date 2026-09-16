import { describe, expect, it } from "vitest";
import { NodeCatalogParser } from "@/src/infrastructure/ecompras/catalog/catalog-parser-node";
import { CatalogParseError } from "@/src/infrastructure/ecompras/catalog/catalog-parser";

const selectors = {
  result: ".result",
  codigo: ".codigo",
  itemId: ".item-id",
  descricao: ".descricao",
  unidade: ".unidade",
};

describe("NodeCatalogParser", () => {
  it("parses HTML with explicit selectors", () => {
    const html = `
      <div class="result">
        <span class="codigo">3.3.90.30.01.00.002.8935</span>
        <span class="item-id">8935</span>
        <span class="descricao">Óleo mineral para motores</span>
        <span class="unidade">20</span>
      </div>`;

    expect(new NodeCatalogParser(selectors).parse(html)).toEqual({
      items: [
        {
          codigoCatalogo: "3.3.90.30.01.00.002.8935",
          itemId: 8935,
          descricao: "Óleo mineral para motores",
          unidade: "20",
        },
      ],
    });
  });

  it("fails when a required field is missing", () => {
    const html = `
      <div class="result">
        <span class="codigo">3.3.90.30.01.00.002.8935</span>
        <span class="descricao">Óleo mineral para motores</span>
        <span class="unidade">20</span>
      </div>`;

    expect(() => new NodeCatalogParser(selectors).parse(html)).toThrow(
      CatalogParseError,
    );
  });
});

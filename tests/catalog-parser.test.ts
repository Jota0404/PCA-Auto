/** @vitest-environment jsdom */

import { describe, expect, it } from "vitest";
import { CatalogParseError, CatalogParser } from "@/src/infrastructure/ecompras/catalog/catalog-parser";

const selectors = {
  result: ".result",
  codigo: ".codigo",
  itemId: ".item-id",
  descricao: ".descricao",
  unidade: ".unidade",
};

describe("CatalogParser", () => {
  it("parses a previously captured structure when explicit selectors are supplied", () => {
    const html = `
      <div class="result">
        <span class="codigo">3.3.90.30.01.00.002.8935</span>
        <span class="item-id">8935</span>
        <span class="descricao">Óleo mineral para motores</span>
        <span class="unidade">20</span>
      </div>`;

    const result = new CatalogParser(selectors).parse(html);

    expect(result.items).toEqual([
      {
        codigoCatalogo: "3.3.90.30.01.00.002.8935",
        itemId: 8935,
        descricao: "Óleo mineral para motores",
        unidade: "20",
      },
    ]);
  });

  it("rejects a missing ItemId", () => {
    const html = `
      <div class="result">
        <span class="codigo">3.3.90.30.01.00.002.8935</span>
        <span class="descricao">Óleo mineral para motores</span>
        <span class="unidade">20</span>
      </div>`;

    expect(() => new CatalogParser(selectors).parse(html)).toThrow(CatalogParseError);
  });

  it("does not invent selectors when configuration is incomplete", () => {
    expect(() =>
      new CatalogParser({ ...selectors, itemId: "" }).parse("<div></div>"),
    ).toThrow(CatalogParseError);
  });
});

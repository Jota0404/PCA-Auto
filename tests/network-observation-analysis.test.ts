import { describe, expect, it } from "vitest";
import {
  findChangedQueryKeys,
  summarizeCatalogObservations,
} from "@/src/infrastructure/ecompras/network-observation-analysis";
import type { ObservedRequest } from "@/src/infrastructure/ecompras/network-observation";

function request(url: string): ObservedRequest {
  return {
    url,
    method: "GET",
    resourceType: "document",
    contentType: "text/html",
    postData: null,
    timestamp: "2026-09-16T00:00:00.000Z",
  };
}

describe("network observation analysis", () => {
  it("lista chaves e valores efetivamente observados", () => {
    const result = summarizeCatalogObservations([
      request(
        "https://portal.compras.df.gov.br/ecompras/Consultantes/Pesquisar?TipoConsulta=1&Pesquisa=111",
      ),
      request(
        "https://portal.compras.df.gov.br/ecompras/Consultantes/Pesquisar?TipoConsulta=1&Pesquisa=222",
      ),
    ]);

    expect(result.queryKeys).toEqual(["Pesquisa", "TipoConsulta"]);
    expect(result.queryValues.Pesquisa).toEqual(["111", "222"]);
    expect(result.queryValues.TipoConsulta).toEqual(["1"]);
  });

  it("identifica apenas parâmetros que mudaram entre duas buscas", () => {
    const first = request(
      "https://portal.compras.df.gov.br/ecompras/Consultantes/Pesquisar?TipoConsulta=1&Pesquisa=111",
    );
    const second = request(
      "https://portal.compras.df.gov.br/ecompras/Consultantes/Pesquisar?TipoConsulta=1&Pesquisa=222",
    );

    expect(findChangedQueryKeys(first, second)).toEqual(["Pesquisa"]);
  });

  it("não considera outras rotas como consultas do catálogo", () => {
    const result = summarizeCatalogObservations([
      request("https://portal.compras.df.gov.br/ecompras/Consultantes/Outra"),
    ]);

    expect(result.candidates).toHaveLength(0);
    expect(result.queryKeys).toEqual([]);
  });
});

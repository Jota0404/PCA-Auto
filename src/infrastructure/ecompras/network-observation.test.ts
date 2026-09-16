import { describe, expect, it } from "vitest";
import {
  extractObservedQuery,
  isCatalogCandidate,
  type ObservedRequest,
} from "./network-observation";

describe("network observation", () => {
  it("identifies only GET requests for the confirmed catalog route", () => {
    const request: ObservedRequest = {
      url: "https://portal.compras.df.gov.br/ecompras/Consultantes/Pesquisar?Pesquisa=123",
      method: "GET",
      timestamp: "2026-09-16T00:00:00.000Z",
    };

    expect(isCatalogCandidate(request)).toBe(true);
  });

  it("does not treat another method as a catalog GET candidate", () => {
    const request: ObservedRequest = {
      url: "https://portal.compras.df.gov.br/ecompras/Consultantes/Pesquisar?Pesquisa=123",
      method: "POST",
      timestamp: "2026-09-16T00:00:00.000Z",
    };

    expect(isCatalogCandidate(request)).toBe(false);
  });

  it("extracts exactly the parameters present in the observed URL", () => {
    const request: ObservedRequest = {
      url:
        "https://portal.compras.df.gov.br/ecompras/Consultantes/Pesquisar?TipoCatalogo=A&Pesquisa=123&Pesquisa2=ABC",
      method: "GET",
      timestamp: "2026-09-16T00:00:00.000Z",
    };

    expect(extractObservedQuery(request)).toEqual({
      TipoCatalogo: "A",
      Pesquisa: "123",
      Pesquisa2: "ABC",
    });
  });
});

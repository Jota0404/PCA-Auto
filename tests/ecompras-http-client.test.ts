import { describe, expect, it, vi } from "vitest";
import { EComprasHttpClient, EComprasHttpError } from "@/src/infrastructure/ecompras/ecompras-http-client";

describe("EComprasHttpClient", () => {
  it("requests the documented catalog route without assuming search parameters", async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      new Response("<html></html>", {
        status: 200,
        headers: { "content-type": "text/html" },
      }),
    );

    const client = new EComprasHttpClient({ fetchImpl: fetchMock });
    const result = await client.getCatalogPage({
      TipoCatalogo: "1",
      TipoConsulta: "2",
      Pesquisa: "EXAMPLE",
    });

    expect(result.status).toBe(200);
    expect(result.contentType).toContain("text/html");

    const [request] = fetchMock.mock.calls[0] ?? [];
    expect(String(request)).toContain("/ecompras/Consultantes/Pesquisar");
    expect(String(request)).toContain("TipoCatalogo=1");
    expect(String(request)).toContain("TipoConsulta=2");
    expect(String(request)).toContain("Pesquisa=EXAMPLE");
  });

  it("rejects non-successful portal responses", async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      new Response("erro", { status: 500 }),
    );

    const client = new EComprasHttpClient({ fetchImpl: fetchMock });

    await expect(client.getCatalogPage()).rejects.toBeInstanceOf(
      EComprasHttpError,
    );
  });
});

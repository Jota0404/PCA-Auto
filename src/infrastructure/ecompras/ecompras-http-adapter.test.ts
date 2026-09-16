import { describe, expect, it, vi } from "vitest";
import { EComprasHttpAdapter } from "./ecompras-http-adapter";
import { EComprasHttpClient } from "./ecompras-http-client";

describe("EComprasHttpAdapter", () => {
  it("usa somente o parâmetro de código explicitamente configurado", async () => {
    const fetchImpl = vi.fn<typeof fetch>(async (input) => {
      expect(String(input)).toContain("TipoConsulta2=CODIGO");
      expect(String(input)).toContain("Pesquisa2=123.456");
      expect(String(input)).not.toContain("Pesquisa=123.456");

      return new Response(`
        <div class="result">
          <span class="codigo">123.456</span>
          <span class="item-id">987</span>
          <span class="descricao">Item de teste</span>
          <span class="unidade">UN</span>
        </div>
      `, {
        status: 200,
        headers: { "content-type": "text/html" },
      });
    });

    const adapter = new EComprasHttpAdapter(
      new EComprasHttpClient({ fetchImpl }),
      {
        result: ".result",
        codigo: ".codigo",
        itemId: ".item-id",
        descricao: ".descricao",
        unidade: ".unidade",
      },
      {
        codigoParameter: "Pesquisa2",
        staticParameters: { TipoConsulta2: "CODIGO" },
      },
    );

    await expect(adapter.buscarItemPorCodigo(" 123.456 ")).resolves.toEqual({
      items: [
        {
          codigoCatalogo: "123.456",
          itemId: 987,
          descricao: "Item de teste",
          unidade: "UN",
        },
      ],
    });

    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it("recusa código vazio antes de consultar o portal", async () => {
    const fetchImpl = vi.fn<typeof fetch>();
    const adapter = new EComprasHttpAdapter(
      new EComprasHttpClient({ fetchImpl }),
      {
        result: ".result",
        codigo: ".codigo",
        itemId: ".item-id",
        descricao: ".descricao",
        unidade: ".unidade",
      },
      { codigoParameter: "Pesquisa2" },
    );

    await expect(adapter.buscarItemPorCodigo("   ")).rejects.toThrow(
      "Código de catálogo não pode ser vazio.",
    );
    expect(fetchImpl).not.toHaveBeenCalled();
  });
});

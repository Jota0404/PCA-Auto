import { mkdir, writeFile } from "node:fs/promises";
import { EComprasHttpClient } from "@/src/infrastructure/ecompras/ecompras-http-client";

/**
 * Executes a read-only HTTP probe against the confirmed catalog route.
 *
 * Usage examples:
 *   npm run probe:ecompras:http
 *   npm run probe:ecompras:http -- Pesquisa=papel TipoConsulta=1
 *
 * Arguments are sent as query parameters exactly as provided. This script
 * does not use Playwright, does not open the print page and does not submit
 * any form. It is intended only to inspect the normal catalog response.
 */
async function main(): Promise<void> {
  const query = parseQuery(process.argv.slice(2));
  const client = new EComprasHttpClient();

  console.log("Consultando catálogo por HTTP...");
  console.log("Parâmetros:", query);

  const response = await client.getCatalogPage(query);
  const output = `artifacts/ecompras/http-catalog-${Date.now()}.html`;

  await mkdir("artifacts/ecompras", { recursive: true });
  await writeFile(output, response.html, "utf8");

  console.log("Status:", response.status);
  console.log("Content-Type:", response.contentType ?? "não informado");
  console.log("URL:", response.url);
  console.log("Tamanho da resposta:", `${Buffer.byteLength(response.html, "utf8")} bytes`);
  console.log("HTML salvo em:", output);
}

function parseQuery(args: string[]): Record<string, string> {
  return Object.fromEntries(
    args.map((argument) => {
      const separator = argument.indexOf("=");

      if (separator <= 0) {
        throw new Error(
          `Parâmetro inválido: "${argument}". Use o formato Nome=Valor.`,
        );
      }

      return [argument.slice(0, separator), argument.slice(separator + 1)];
    }),
  );
}

main().catch((error: unknown) => {
  console.error("Falha na consulta HTTP:", error);
  process.exitCode = 1;
});

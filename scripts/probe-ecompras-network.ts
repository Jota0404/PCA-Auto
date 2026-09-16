import { mkdir, writeFile } from "node:fs/promises";
import { EComprasBrowserSession } from "@/src/infrastructure/ecompras/playwright/ecompras-browser-session";
import type { ObservedRequest } from "@/src/infrastructure/ecompras/network-observation";

/**
 * Captures network evidence while the user manually searches the catalog.
 *
 * It records only request metadata available from Playwright. The script does
 * not fill forms, submit the catalog search, or persist credentials.
 */
async function main(): Promise<void> {
  const session = new EComprasBrowserSession();
  const requests: ObservedRequest[] = [];

  try {
    const page = await session.openCatalog();

    page.on("request", (request) => {
      const url = request.url();
      if (!url.includes("/ecompras/")) return;

      const headers = request.headers();
      requests.push({
        url,
        method: request.method(),
        resourceType: request.resourceType(),
        contentType: headers["content-type"] ?? null,
        postData: request.postData(),
        timestamp: new Date().toISOString(),
      });
    });

    console.log("Página aberta:", page.url());
    console.log("Faça o login e pesquise manualmente o código conhecido.");
    console.log("Depois pressione ENTER para salvar a evidência.");
    await waitForEnter();

    await mkdir("artifacts/ecompras", { recursive: true });
    const output = `artifacts/ecompras/network-${Date.now()}.json`;
    await writeFile(output, JSON.stringify(requests, null, 2), "utf8");

    console.log(`Requisições capturadas: ${requests.length}`);
    console.log(`Evidência salva em: ${output}`);
  } finally {
    await session.close();
  }
}

function waitForEnter(): Promise<void> {
  return new Promise((resolve) => {
    process.stdin.resume();
    process.stdin.once("data", () => {
      process.stdin.pause();
      resolve();
    });
  });
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

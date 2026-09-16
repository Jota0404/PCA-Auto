import { mkdir, writeFile } from "node:fs/promises";
import { EComprasBrowserSession } from "@/src/infrastructure/ecompras/playwright/ecompras-browser-session";
import {
  isCatalogCandidate,
  type ObservedRequest,
  type ObservedResponse,
} from "@/src/infrastructure/ecompras/network-observation";

/**
 * Captures network evidence while the user manually searches the catalog.
 *
 * The probe records request metadata and, for catalog-search responses, stores
 * the response HTML separately. It never fills forms, submits the search, or
 * persists credentials/cookies.
 */
async function main(): Promise<void> {
  const session = new EComprasBrowserSession();
  const requests: ObservedRequest[] = [];
  const responses: ObservedResponse[] = [];

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

    page.on("response", async (response) => {
      const request = response.request();
      const observedRequest: ObservedRequest = {
        url: request.url(),
        method: request.method(),
        resourceType: request.resourceType(),
        timestamp: new Date().toISOString(),
      };

      if (!isCatalogCandidate(observedRequest)) return;

      const contentType = response.headers()["content-type"] ?? null;
      const observed: ObservedResponse = {
        url: response.url(),
        status: response.status(),
        contentType,
        timestamp: new Date().toISOString(),
      };

      if (contentType?.toLowerCase().includes("text/html")) {
        try {
          await mkdir("artifacts/ecompras/responses", { recursive: true });
          const file = `artifacts/ecompras/responses/catalog-${Date.now()}.html`;
          await writeFile(file, await response.text(), "utf8");
          observed.bodyFile = file;
        } catch (error) {
          console.warn("Não foi possível salvar o HTML da resposta:", error);
        }
      }

      responses.push(observed);
    });

    console.log("Página aberta:", page.url());
    console.log("Faça o login e pesquise manualmente o código conhecido.");
    console.log(
      "Para comparar a busca, pesquise pelo menos dois códigos diferentes antes de pressionar ENTER.",
    );
    await waitForEnter();

    await mkdir("artifacts/ecompras", { recursive: true });
    const output = `artifacts/ecompras/network-${Date.now()}.json`;
    await writeFile(
      output,
      JSON.stringify(
        { capturedAt: new Date().toISOString(), requests, responses },
        null,
        2,
      ),
      "utf8",
    );

    console.log(`Requisições capturadas: ${requests.length}`);
    console.log(`Respostas de catálogo capturadas: ${responses.length}`);
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

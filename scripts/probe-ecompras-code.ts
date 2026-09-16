import { mkdir, writeFile } from "node:fs/promises";
import { EComprasBrowserSession } from "@/src/infrastructure/ecompras/playwright/ecompras-browser-session";

/**
 * Captures the network request produced by a manual catalog search.
 *
 * The script never fills fields or submits forms itself. The user performs the
 * search in the visible browser, while Playwright records request metadata so
 * the exact query parameter names and request method can be verified later.
 */
async function main(): Promise<void> {
  const session = new EComprasBrowserSession();

  try {
    const page = await session.openCatalog();
    const requests: Array<{
      method: string;
      url: string;
      resourceType: string;
      postData: string | null;
    }> = [];

    page.on("request", (request) => {
      const url = request.url();
      if (!url.includes("/ecompras/")) return;

      requests.push({
        method: request.method(),
        url,
        resourceType: request.resourceType(),
        postData: request.postData(),
      });
    });

    console.log("Página aberta:", page.url());
    console.log("Faça o login manualmente, se necessário.");
    console.log("Realize UMA busca manual por um código de catálogo conhecido.");
    console.log("Depois pressione ENTER para salvar a evidência de rede.");
    await waitForEnter();

    await mkdir("artifacts/ecompras", { recursive: true });
    const output = `artifacts/ecompras/catalog-network-${Date.now()}.json`;

    await writeFile(
      output,
      JSON.stringify(
        {
          capturedAt: new Date().toISOString(),
          pageUrl: page.url(),
          requests,
        },
        null,
        2,
      ),
      "utf8",
    );

    console.log(`Evidência de rede salva em: ${output}`);
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

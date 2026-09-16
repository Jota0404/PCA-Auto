import { writeFile } from "node:fs/promises";
import { EComprasBrowserSession } from "@/src/infrastructure/ecompras/playwright/ecompras-browser-session";
import { captureCatalogPage } from "@/src/infrastructure/ecompras/playwright/catalog-probe";

/**
 * Opens the known catalog page in a visible browser and saves one HTML snapshot.
 *
 * Usage:
 *   npx tsx scripts/probe-ecompras-catalog.ts
 *
 * The script is intentionally manual. The user can authenticate/interact with
 * the portal, after which the current page is captured for investigation.
 */
async function main(): Promise<void> {
  const session = new EComprasBrowserSession();

  try {
    const page = await session.openCatalog();

    console.log("Navegador aberto:", page.url());
    console.log("Faça o login manualmente, se necessário.");
    console.log("Depois pressione ENTER nesta janela para capturar o HTML.");

    await waitForEnter();

    const snapshot = await captureCatalogPage(page);
    const output = `artifacts/ecompras/catalog-${Date.now()}.html`;

    await writeFile(output, snapshot.html, "utf8");
    console.log(`Snapshot salvo em: ${output}`);
    console.log(`URL capturada: ${snapshot.url}`);
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

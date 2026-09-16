import { mkdir, writeFile } from "node:fs/promises";
import { EComprasBrowserSession } from "@/src/infrastructure/ecompras/playwright/ecompras-browser-session";

/**
 * Captures neutral structural evidence from the currently displayed catalog.
 *
 * It does not assume a result selector and does not submit or mutate anything.
 * The generated JSON is an investigation artifact used to derive verified
 * selectors for CatalogParser in a later commit.
 */
async function main(): Promise<void> {
  const session = new EComprasBrowserSession();

  try {
    const page = await session.openCatalog();

    console.log("Página aberta:", page.url());
    console.log("Faça o login manualmente e realize a busca do item conhecido.");
    console.log("Depois pressione ENTER para capturar a estrutura atual.");
    await waitForEnter();

    const evidence = await page.evaluate(() => {
      const tables = Array.from(document.querySelectorAll("table")).map((table, index) => ({
        index,
        text: table.innerText.trim(),
        html: table.outerHTML,
      }));

      const links = Array.from(document.querySelectorAll("a"))
        .map((link) => ({
          text: link.textContent?.trim() ?? "",
          href: link.getAttribute("href"),
          onclick: link.getAttribute("onclick"),
        }))
        .filter((link) => link.text || link.href || link.onclick);

      const forms = Array.from(document.querySelectorAll("form")).map((form, index) => ({
        index,
        method: form.method,
        action: form.action,
        enctype: form.enctype,
        fields: Array.from(form.elements).map((element) => ({
          tag: element.tagName,
          name: (element as HTMLInputElement).name,
          type: (element as HTMLInputElement).type,
          id: (element as HTMLElement).id,
          value: (element as HTMLInputElement).value,
        })),
      }));

      return {
        capturedAt: new Date().toISOString(),
        url: location.href,
        title: document.title,
        tables,
        links,
        forms,
        bodyText: document.body.innerText,
      };
    });

    await mkdir("artifacts/ecompras", { recursive: true });
    const output = `artifacts/ecompras/catalog-structure-${Date.now()}.json`;
    await writeFile(output, JSON.stringify(evidence, null, 2), "utf8");

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

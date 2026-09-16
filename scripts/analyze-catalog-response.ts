import { readFile } from "node:fs/promises";
import { JSDOM } from "jsdom";

/**
 * Produces a neutral structural report from a captured catalog HTML response.
 *
 * This intentionally reports attributes/text that are present in the HTML
 * rather than deciding which selector or field is the production contract.
 */
async function main(): Promise<void> {
  const input = process.argv[2];
  if (!input) {
    throw new Error("Informe o caminho do HTML capturado.");
  }

  const html = await readFile(input, "utf8");
  if (!html.trim()) {
    throw new Error("O HTML capturado está vazio.");
  }

  const dom = new JSDOM(html);
  const document = dom.window.document;

  console.log("Título:", document.title || "(sem título)");
  console.log("Tabelas:", document.querySelectorAll("table").length);
  console.log("Formulários:", document.querySelectorAll("form").length);
  console.log("Inputs:", document.querySelectorAll("input").length);
  console.log("Links:", document.querySelectorAll("a").length);

  for (const [index, form] of Array.from(document.querySelectorAll("form")).entries()) {
    console.log(`\n[FORM ${index + 1}]`);
    console.log("method:", form.getAttribute("method") ?? "(default)");
    console.log("action:", form.getAttribute("action") ?? "(default)");
    console.log("enctype:", form.getAttribute("enctype") ?? "(default)");

    for (const input of Array.from(form.querySelectorAll("input"))) {
      console.log({
        name: input.getAttribute("name"),
        id: input.id || null,
        type: input.getAttribute("type") ?? "text",
        value: input.getAttribute("value"),
      });
    }
  }

  for (const [index, table] of Array.from(document.querySelectorAll("table")).entries()) {
    console.log(`\n[TABLE ${index + 1}]`);
    const rows = Array.from(table.querySelectorAll("tr")).slice(0, 10);
    rows.forEach((row, rowIndex) => {
      console.log(`row ${rowIndex + 1}:`, row.textContent?.replace(/\s+/g, " ").trim() ?? "");
    });
  }

  console.log("\n[LINKS COM onclick/HREF] ");
  for (const link of Array.from(document.querySelectorAll("a"))) {
    const href = link.getAttribute("href");
    const onclick = link.getAttribute("onclick");
    if (!href && !onclick) continue;
    console.log({
      text: link.textContent?.replace(/\s+/g, " ").trim() ?? "",
      href,
      onclick,
    });
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

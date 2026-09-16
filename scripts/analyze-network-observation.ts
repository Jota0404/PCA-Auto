import { readFile } from "node:fs/promises";
import { isCatalogCandidate, extractObservedQuery, type ObservedRequest } from "@/src/infrastructure/ecompras/network-observation";

/**
 * Reads a network observation JSON file and prints only facts present in the
 * captured request. This keeps investigation reproducible and prevents the
 * analyzer from turning assumptions into integration rules.
 */
async function main(): Promise<void> {
  const input = process.argv[2];
  if (!input) {
    throw new Error("Informe o caminho do arquivo JSON de observação.");
  }

  const raw = await readFile(input, "utf8");
  const requests = JSON.parse(raw) as ObservedRequest[];
  if (!Array.isArray(requests)) {
    throw new Error("O arquivo deve conter um array de requisições observadas.");
  }

  const catalogRequests = requests.filter(isCatalogCandidate);
  console.log(`Requisições observadas: ${requests.length}`);
  console.log(`Candidatas à consulta do catálogo: ${catalogRequests.length}`);

  for (const [index, request] of catalogRequests.entries()) {
    console.log(`\n[CANDIDATA ${index + 1}]`);
    console.log(`URL: ${request.url}`);
    console.log(`Content-Type: ${request.contentType ?? "não informado"}`);
    console.log("Query:", extractObservedQuery(request));
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

/**
 * Low-level HTTP client for the e-ComprasDF portal.
 *
 * The documented catalog route returns HTML rather than a public JSON API.
 * This client therefore exposes the raw response and deliberately does not
 * infer selectors, ItemId mappings or query semantics that have not yet been
 * verified against a live request.
 */
export class EComprasHttpError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EComprasHttpError";
  }
}

export interface EComprasHttpClientOptions {
  baseUrl?: string;
  fetchImpl?: typeof fetch;
}

export interface CatalogPageResponse {
  url: string;
  status: number;
  contentType: string | null;
  html: string;
}

const DEFAULT_BASE_URL =
  "https://portal.compras.df.gov.br/ecompras";

/**
 * HTTP-only client used for controlled investigation and later catalog reads.
 */
export class EComprasHttpClient {
  private readonly baseUrl: string;
  private readonly fetchImpl: typeof fetch;

  constructor(options: EComprasHttpClientOptions = {}) {
    this.baseUrl = options.baseUrl ?? DEFAULT_BASE_URL;
    this.fetchImpl = options.fetchImpl ?? fetch;
  }

  /**
   * Fetches the known catalog page using caller-provided query parameters.
   *
   * Query values are intentionally not hard-coded beyond the confirmed route;
   * the exact parameter used to search by catalog code is still a test item.
   */
  async getCatalogPage(
    query: Record<string, string> = {},
  ): Promise<CatalogPageResponse> {
    const url = new URL(`${this.baseUrl}/Consultantes/Pesquisar`);

    for (const [key, value] of Object.entries(query)) {
      url.searchParams.set(key, value);
    }

    const response = await this.fetchImpl(url, {
      method: "GET",
      headers: {
        Accept: "text/html,application/xhtml+xml",
      },
    });

    const contentType = response.headers.get("content-type");
    const html = await response.text();

    if (!response.ok) {
      throw new EComprasHttpError(
        `Consulta do catálogo falhou com HTTP ${response.status}.`,
      );
    }

    return {
      url: url.toString(),
      status: response.status,
      contentType,
      html,
    };
  }
}

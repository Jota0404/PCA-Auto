/**
 * A single network request observed while manually interacting with the
 * e-ComprasDF portal.
 *
 * These records are investigation artifacts. They are not treated as the
 * production integration contract until the request has been reproduced and
 * verified against the live portal.
 */
export interface ObservedRequest {
  url: string;
  method: string;
  resourceType?: string;
  contentType?: string | null;
  postData?: string | null;
  timestamp: string;
}

/** Response metadata associated with an observed request. */
export interface ObservedResponse {
  url: string;
  status: number;
  contentType?: string | null;
  bodyFile?: string;
  timestamp: string;
}

export function isCatalogCandidate(request: ObservedRequest): boolean {
  return (
    request.method.toUpperCase() === "GET" &&
    request.url.includes("/ecompras/Consultantes/Pesquisar")
  );
}

/**
 * Returns only query parameters that are explicitly present in the observed
 * request URL. It never invents names or values.
 */
export function extractObservedQuery(
  request: ObservedRequest,
): Record<string, string> {
  const url = new URL(request.url);
  return Object.fromEntries(url.searchParams.entries());
}

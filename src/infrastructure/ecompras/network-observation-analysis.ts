import type { ObservedRequest } from "./network-observation";
import { extractObservedQuery, isCatalogCandidate } from "./network-observation";

export interface CatalogObservationSummary {
  candidates: ObservedRequest[];
  queryKeys: string[];
  queryValues: Record<string, string[]>;
}

/**
 * Summarizes only values that were actually observed in catalog GET requests.
 * No parameter is promoted to a production rule by this function.
 */
export function summarizeCatalogObservations(
  requests: ObservedRequest[],
): CatalogObservationSummary {
  const candidates = requests.filter(isCatalogCandidate);
  const values = new Map<string, Set<string>>();

  for (const request of candidates) {
    for (const [key, value] of Object.entries(extractObservedQuery(request))) {
      const set = values.get(key) ?? new Set<string>();
      set.add(value);
      values.set(key, set);
    }
  }

  return {
    candidates,
    queryKeys: [...values.keys()].sort(),
    queryValues: Object.fromEntries(
      [...values.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, keyValues]) => [key, [...keyValues].sort()]),
    ),
  };
}

/**
 * Returns keys whose observed value changed between two catalog searches.
 * This is evidence for investigation, not proof of the portal's semantics.
 */
export function findChangedQueryKeys(
  first: ObservedRequest,
  second: ObservedRequest,
): string[] {
  const firstQuery = extractObservedQuery(first);
  const secondQuery = extractObservedQuery(second);
  const keys = new Set([...Object.keys(firstQuery), ...Object.keys(secondQuery)]);

  return [...keys]
    .filter((key) => firstQuery[key] !== secondQuery[key])
    .sort();
}

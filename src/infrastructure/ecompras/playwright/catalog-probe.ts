import type { Page } from "playwright";

/**
 * Captured information from the known catalog page.
 *
 * This probe intentionally stores only the page URL and HTML snapshot. It does
 * not infer selectors, ItemId fields or result semantics before those details
 * are observed again in the live portal.
 */
export interface CatalogProbeResult {
  url: string;
  html: string;
}

/**
 * Captures the current catalog page for manual inspection.
 *
 * The probe is an investigation tool, not the final catalog parser.
 */
export async function captureCatalogPage(page: Page): Promise<CatalogProbeResult> {
  return {
    url: page.url(),
    html: await page.content(),
  };
}

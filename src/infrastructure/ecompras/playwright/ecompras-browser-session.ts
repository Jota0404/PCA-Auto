import { chromium, type Browser, type BrowserContext, type Page } from "playwright";

/**
 * Owns the browser lifecycle used to establish an authenticated e-ComprasDF
 * session without storing the user's credentials.
 *
 * Important: authentication remains manual in the MVP. This class deliberately
 * does not search for, fill, or submit login fields because the login flow was
 * not part of the confirmed investigation.
 */
export class EComprasBrowserSession {
  private browser?: Browser;
  private context?: BrowserContext;
  private page?: Page;

  async open(): Promise<Page> {
    if (this.page) return this.page;

    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    return this.page;
  }

  /**
   * Opens the known e-ComprasDF catalog route and leaves authentication to the
   * user. No credentials are persisted by PCA Auto.
   */
  async openCatalog(): Promise<Page> {
    const page = await this.open();

    await page.goto("https://portal.compras.df.gov.br/ecompras/Consultantes/Pesquisar", {
      waitUntil: "domcontentloaded",
    });

    return page;
  }

  /** Returns the active browser page for controlled investigation. */
  getPage(): Page {
    if (!this.page) {
      throw new Error("Sessão Playwright não foi iniciada.");
    }

    return this.page;
  }

  /** Closes the browser and releases the local session. */
  async close(): Promise<void> {
    await this.browser?.close();
    this.page = undefined;
    this.context = undefined;
    this.browser = undefined;
  }
}

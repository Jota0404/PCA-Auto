import { defineConfig } from "vitest/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/**
 * Vitest configuration mirrors the TypeScript `@/*` path alias so tests use
 * the same module paths as the application code.
 */
export default defineConfig({
  resolve: {
    alias: {
      "@": projectRoot,
    },
  },
  test: {
    globals: false,
  },
});

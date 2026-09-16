import type { NextConfig } from "next";

/**
 * Next.js configuration for the PCA Auto internal application.
 *
 * The MVP intentionally keeps the framework configuration minimal.
 * Integration-specific behavior belongs in `src/infrastructure`.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;

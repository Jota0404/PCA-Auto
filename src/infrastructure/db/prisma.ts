import { PrismaClient } from "@prisma/client";

/**
 * Shared Prisma client for the application.
 *
 * Keeping one client instance in development avoids opening a new database
 * connection every time Next.js hot reloads a module.
 */
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

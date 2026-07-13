/**
 * lib/prisma.ts
 *
 * Cached Prisma client singleton.
 *
 * Branch logic (per 05-prism.md):
 *  - DATABASE_URL starts with "prisma+postgres://"  → use Prisma Accelerate
 *  - otherwise                                       → use direct @prisma/adapter-pg
 *
 * In development, the client is cached on `global` to survive hot reloads.
 */

import { PrismaClient } from "./generated/prisma";

declare global {
  // Extend NodeJS global so TypeScript doesn't complain.
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

function createPrismaClient(): PrismaClient {
  const url = process.env.DATABASE_URL ?? "";

  if (url.startsWith("prisma+postgres://")) {
    // Prisma Accelerate – the client drivers handle the connection pooling;
    // no custom adapter is needed here.
    return new PrismaClient({
      accelerateUrl: url,
    });
  }

  // Direct PostgreSQL connection via @prisma/adapter-pg.
  // We do a dynamic require so that the PgAdapter import is only loaded when
  // actually needed (keeps the Accelerate path clean).
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Pool } = require("pg") as typeof import("pg");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaPg } = require("@prisma/adapter-pg") as typeof import("@prisma/adapter-pg");

  const pool = new Pool({ connectionString: url });
  const adapter = new PrismaPg(pool);

  return new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);
}

// In production, always create a fresh client.
// In development, cache it on `global` to avoid connection exhaustion on hot reload.
const prisma: PrismaClient =
  process.env.NODE_ENV === "production"
    ? createPrismaClient()
    : (global.__prisma ?? (global.__prisma = createPrismaClient()));

export default prisma;

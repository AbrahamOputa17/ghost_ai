// Prisma 7 config — multi-file schema support.
// Reads DATABASE_URL from .env.local (Next.js convention) via dotenv.
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  // Point to the entire prisma/ folder so Prisma picks up
  // schema.prisma + models/project.prisma automatically.
  schema: "prisma/",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});

// lib/prisma.ts

import { PrismaClient } from "@prisma/client";

// Cria uma variável global para o cliente Prisma para evitar problemas de hot-reload no Next.js
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      // Usa a URL de aceleração para Next.js/Vercel (se não, usa a URL direta)
      db: {
        url: process.env.PRISMA_DATABASE_URL || process.env.DATABASE_URL,
      },
    },
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

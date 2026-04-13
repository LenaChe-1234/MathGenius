import dotenv from "dotenv";
import type { DatabaseProvider } from "../types/domain.js";

dotenv.config();

export interface AppConfig {
  port: number;
  dbProvider: DatabaseProvider;
  postgresUrl: string | undefined;
  mongoUrl: string | undefined;
  mongoDbName: string;
  authTokenSecret: string;
  authTokenTtlSeconds: number;
}

function normalizeProvider(rawProvider: string | undefined, useMemoryFlag: string | undefined): DatabaseProvider {
  if (useMemoryFlag === "true") {
    return "memory";
  }

  if (rawProvider === "postgres" || rawProvider === "mongo" || rawProvider === "memory") {
    return rawProvider;
  }

  return "memory";
}

export function getConfig(): AppConfig {
  const dbProvider = normalizeProvider(process.env.DB_PROVIDER, process.env.USE_IN_MEMORY_DATA);

  return {
    port: Number(process.env.PORT || 3030),
    dbProvider,
    postgresUrl: process.env.DATABASE_URL,
    mongoUrl: process.env.MONGODB_URL,
    mongoDbName: process.env.MONGODB_DB_NAME || "mathginius",
    authTokenSecret: process.env.AUTH_TOKEN_SECRET || "dev-only-change-me",
    authTokenTtlSeconds: Number(process.env.AUTH_TOKEN_TTL_SECONDS || 60 * 60 * 12)
  };
}

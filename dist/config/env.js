import dotenv from "dotenv";
dotenv.config();
function normalizeProvider(rawProvider, useMemoryFlag) {
    if (useMemoryFlag === "true") {
        return "memory";
    }
    if (rawProvider === "postgres" || rawProvider === "mongo" || rawProvider === "memory") {
        return rawProvider;
    }
    return "memory";
}
export function getConfig() {
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

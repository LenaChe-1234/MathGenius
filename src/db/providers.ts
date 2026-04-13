import { MongoClient } from "mongodb";
import pg from "pg";
import { getConfig } from "../config/env.js";

const { Pool } = pg;

export function createPostgresPool(): pg.Pool {
  const config = getConfig();

  if (!config.postgresUrl) {
    throw new Error("DATABASE_URL is required when DB_PROVIDER=postgres.");
  }

  return new Pool({
    connectionString: config.postgresUrl,
    ssl: config.postgresUrl.includes("localhost")
      ? false
      : {
          rejectUnauthorized: false
        }
  });
}

export async function createMongoDatabase() {
  const config = getConfig();

  if (!config.mongoUrl) {
    throw new Error("MONGODB_URL is required when DB_PROVIDER=mongo.");
  }

  const client = new MongoClient(config.mongoUrl);
  await client.connect();

  return {
    client,
    db: client.db(config.mongoDbName)
  };
}

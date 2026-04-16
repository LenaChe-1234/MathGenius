import { createApp } from "./app.js";
import { getConfig } from "./config/env.js";

async function startServer() {
  const config = getConfig();
  const app = await createApp();

  app.listen(config.port, () => {
    console.log(`MathGenius backend listening on http://localhost:${config.port}`);
    console.log(`Running with ${config.dbProvider}.`);
  });
}

startServer().catch((error: unknown) => {
  console.error("Failed to start backend:", error);
  process.exit(1);
});

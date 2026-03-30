import dotenv from "dotenv";
import http from "http";
import logger from "./app/services/logger.service.js";

dotenv.config({ path: "../.env" });

const port = process.env.API_PORT || 3001;

function checkEnvironmentVariables() {
  logger.info("Checking environment variables...");
  const requiredEnvVars = [
    "API_PORT",
    "DB_HOST",
    "DB_PORT",
    "DB_USER",
    "DB_PASSWORD",
    "DB_DATABASE",
    "REPLICA_DB_HOST",
    "REPLICA_DB_PORT",
  ];
  const unsetVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);
  if (unsetVars.length > 0) {
    logger.error("Missing required environment variables", {
      missing: unsetVars,
    });
    process.exit(1);
  }
  logger.success("Environment variables validated");
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case "EACCES":
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      logger.error(`${bind} is already in use`, {
        suggestion: "Try a different port or stop the conflicting process",
      });
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function printBanner() {
  const banner = `Full - Stack mode actiavted`;
  console.log("\x1b[36m" + banner + "\x1b[0m");
}

function onListening(server) {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;

  console.log("");
  logger.success(`Server ready and listening on ${bind}`);
  console.log("");
  console.log(
    "\x1b[36m  ➜\x1b[0m Local:   \x1b[36mhttp://localhost:" +
      addr.port +
      "\x1b[0m",
  );
  console.log(
    "\x1b[36m  ➜\x1b[0m Network: \x1b[90muse --host to expose\x1b[0m",
  );
  console.log("");
  console.log(
    "\x1b[90m  Environment: " +
      (process.env.NODE_ENV || "development") +
      "\x1b[0m",
  );
  console.log("\x1b[90m  Ready for requests...\x1b[0m");
  console.log("");
}

async function start() {
  try {
    printBanner();
    logger.info(`Starting server on port ${port}...`);
    const app = await import("./app.js");

    app.default.set("port", port);

    const server = http.createServer(app.default);

    server.listen(port);
    server.on("error", onError);
    server.on("listening", () => onListening(server));
  } catch (err) {
    logger.error("Failed to start server", {
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
    process.exit(1);
  }
}

checkEnvironmentVariables();

start();

// knexfile.ts
import dotenv from "dotenv";
import type { Knex } from "knex";

dotenv.config({ path: "../.env" });

const config: Knex.Config = {
  client: "postgresql",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  migrations: {
    directory: "./migrations",
    tableName: "knex_migrations",
  },
  seeds: {
    directory: "./seeds",
  },
  pool: {
    min: 2,
    max: 10,
  },
};

export default config;

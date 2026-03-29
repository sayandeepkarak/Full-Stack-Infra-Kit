import postgres from "postgres";

function getConfig(DB_PORT) {
  return {
    debug: true,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: DB_PORT,
    connect_timeout: 30,
    max: 20,
  };
}

const primarySql = postgres(getConfig(process.env.DB_PORT));
const replicaSql = postgres(getConfig(process.env.REPLICA_DB_PORT));

await primarySql`SELECT CURRENT_TIMESTAMP`;
await replicaSql`SELECT CURRENT_TIMESTAMP`;

export { primarySql, replicaSql };

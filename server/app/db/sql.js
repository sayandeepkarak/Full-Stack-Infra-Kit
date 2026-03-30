import postgres from "postgres";

function getConfig(host) {
  return {
    debug: true,
    host,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connect_timeout: 30,
    max: 20,
  };
}

const primarySql = postgres(getConfig(process.env.DB_HOST));
const replicaSql = postgres(getConfig(process.env.REPLICA_DB_HOST));

await primarySql`SELECT CURRENT_TIMESTAMP`;
await replicaSql`SELECT CURRENT_TIMESTAMP`;

export { primarySql, replicaSql };

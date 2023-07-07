import mysql from "mysql2";
import configuration from "../config/configuration";

let cachedDb: mysql.Pool = null;

export function connectToClient() {
  return mysql.createPool({
    host: configuration.database.host,
    user: configuration.database.user,
    password: configuration.database.password,
    port: configuration.database.port,
    database: configuration.database.name,
  });
}

export function connectToDatabase() {
  if (cachedDb) {
    console.log("=> using cached database instance");
    return cachedDb;
  }
  const client = connectToClient();
  cachedDb = client;
  return client;
}

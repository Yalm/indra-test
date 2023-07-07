export default {
  client: {
    swapi: {
      baseURL: process.env.SWAPI_URL || "https://swapi.py4e.com/api",
    },
  },
  database: {
    name: process.env.DB_NAME || "indra",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    password: process.env.DB_PASSWORD || "admin",
    user: process.env.DB_USER || "root",
  },
};

const { Client } = require("pg");

const dbName = `your-db-name`;

const client = new Client({
  connectionString:
    process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`,
});

module.exports = client;

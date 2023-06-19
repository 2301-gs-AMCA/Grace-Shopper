const client = require("./client");
const { users, items } = require("./seedData");
const { createUser } = require("./adapters/users");
const { createItem } = require("./adapters/items");

async function dropTables() {
  console.log("Dropping tables...");
  try {
    await client.query(`
    DROP TABLE IF EXISTS order_items;
    DROP TABLE IF EXISTS items;
    DROP TABLE IF EXISTS order;
    DROP TABLE IF EXISTS users;
    `);
    console.log("Finished dropping Tables!");
  } catch (error) {
    console.error("Error dropping tables...");
    throw error;
  }
}

async function createTables() {
  console.log("Creating tables...");
  try {
    await client.query(`CREATE TABLE users (
      id SERIAL Primary Key,
      isAdmin boolean NOT NULL,
      loggedIn boolean NOT NULL,
      username varchar(255) UNIQUE NOT NULL,
      password varchar(255) NOT NULL
  );`);
    await client.query(`CREATE TABLE order (
    id SERIAL PRIMARY KEY,
    userId INTEGER REFERENCES users(id),
    totalPrice INTEGER,
  );`);
    await client.query(`CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name varchar(255) UNIQUE NOT NULL,
    description text NOT NULL,
    cost INTEGER,
    isAvailable BOOLEAN DEFAULT true,
  );`);
    await client.query(`CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    orderId INTEGER REFERENCES order(id),
    itemId INTEGER REFERENCES items(id),
    item_quantity INTEGER,
    price INTEGER,
  )`);
  } catch (error) {
    console.log("Error creating tables...");
    throw error;
  }
}

async function populateTables() {
  console.log("Populating tables...");
  try {
    for (const user of users) {
      await createUser(user);
    }

    for (const item of items) {
      await createItem(item);
    }
    console.log("Tables populated!");
  } catch (error) {
    console.error(error);
  }
}
async function rebuildDb() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await populateTables();
    console.log("<----testing database----->");
    console.log("<----testing database----->");
    console.log("<----testing database----->");
  } catch (error) {
    console.error(error);
  } finally {
    console.log("ending client");
    client.end();
  }
}

rebuildDb();

const client = require("./client");
const { users, items } = require("./seedData");
const { createUser } = require("./adapters/users");
const { createItem } = require("./adapters/items");

let settled = false;

async function dropTables() {
  console.log("Dropping tables...");
  try {
    await client.query(`
    DROP TABLE IF EXISTS Items;
    DROP TABLE IF EXISTS Users;`);
    console.log("Finished dropping Tables!");
  } catch (error) {
    console.error("Error dropping tables...");
    throw error;
  }
}

async function createTables() {
  console.log("Creating tables...");
  try {
    await client.query(`CREATE TABLE Users (
      id SERIAL Primary Key,
      isAdmin boolean NOT NULL,
      loggedIn boolean NOT NULL,
      username varchar(255) UNIQUE NOT NULL,
      password varchar(255) NOT NULL
  );`);
    await client.query(`CREATE TABLE Items (
      id SERIAL Primary Key,
      name varchar(255) UNIQUE NOT NULL,
      description text   NOT NULL,
      cost varchar(255)   NOT NULL,
      categoryId int   NOT NULL,
      available boolean   NOT NULL, 
      tags text   NOT NULL
  
  );`);
  } catch (error) {
    console.log("Error creating tables...");
    throw error;
  }
}

async function populateTables() {
  console.log("Populating tables...");
  try {
    const populateUsers = users.map(async (user) => await createUser(user));
    const populateItems = items.map(async (item) => await createItem(item));
    console.log("Tables populated!");
    Promise.all([populateUsers, populateItems]).then((settled = true));
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
  } catch (error) {
    console.error(error);
  } finally {
    console.log("ending client");
    if (settled) {
      client.end();
    }
  }
}

rebuildDb();

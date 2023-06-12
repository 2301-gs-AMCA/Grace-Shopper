const client = require("./client");

async function dropTables() {
  console.log("Dropping tables...");
  try {
  } catch (error) {
    console.error(error);
  }
}

async function createTables() {
  console.log("Creating tables...");
  try {
  } catch (error) {
    console.log(error);
  }
}

async function populateTables() {
  console.log("Populating tables...");
  try {
  } catch (error) {
    console.error(error);
  }
}

async function rebuildDb() {
  client.connect();
  try {
    await dropTables();
    await createTables();
    await populateTables();
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
}

rebuildDb();

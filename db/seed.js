const client = require("./client");

async function dropTables() {
  console.log("Dropping tables...");
  try {
    await client.query(`
    DROP TABLE IF EXISTS category
    DROP TABLE IF EXISTS order_items;
    DROP TABLE IF EXISTS order;
    DROP TABLE IF EXISTS items;
    DROP TABLE IF EXISTS users`);
  } catch (error) {
    console.error(error);
  }
}

async function createTables() {
  console.log("Creating tables...");
  try {
    await client.query(`CREATE TABLE "Users" (
      "id" int   NOT NULL,
      "isAdmin" boolean   NOT NULL,
      "loggedIn" boolean   NOT NULL,
      "username" text   NOT NULL,
      "password" text   NOT NULL,
      CONSTRAINT "pk_Users" PRIMARY KEY (
          "id"
       )
  );`);
    await client.query(`
    CREATE TABLE "Items" (
      "id" int   NOT NULL,
      "name" text   NOT NULL,
      "description" text   NOT NULL,
      "cost" int   NOT NULL,
      "categoryId" int   NOT NULL,
      "available" boolean   NOT NULL,
      "tags" text   NOT NULL,
      CONSTRAINT "pk_Items" PRIMARY KEY (
          "id"
       )
  );`);
    await client.query(`
    CREATE TABLE "Category" (
      "id" int   NOT NULL,
      "name" text   NOT NULL,
      "description" text   NOT NULL,
      CONSTRAINT "pk_Category" PRIMARY KEY (
          "id"
       )
  );`);
    await client.query(`
    CREATE TABLE "Order_Items" (
      "id" int   NOT NULL,
      "itemId" int   NOT NULL,
      "item_quantity" int   NOT NULL,
      "price" int   NOT NULL,
      "orderId" int   NOT NULL,
      CONSTRAINT "pk_Order_Items" PRIMARY KEY (
          "id"
       )
  );
    `);
    await client.query(`
    CREATE TABLE "Order" (
      "id" int   NOT NULL,
      "usersId" int   NOT NULL,
      "totalPrice" int   NOT NULL,
      CONSTRAINT "pk_Order" PRIMARY KEY (
          "id"
       )
  );
    `);
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

const client = require("./client");
const { users, items } = require("./seedData");
const { createUser, getAllUsers, getUser, getUserById,getUserByUsername} = require("./adapters/users");
const { createItem, getAllItems, getItemById, updateItem} = require("./adapters/items");
const { createOrder, getOrderById, updateOrder,getAllUsersOrders,getAllOrdersByUsername} = require("./adapters/order");
const { getOrderItemById, addItemToOrder, getOrderItemsByOrderId,updateOrderItem,destroyOrderItem} = require("./adapters/order_items");

async function dropTables() {
  console.log("Dropping tables...");
  try {
    await client.query(`
    DROP TABLE IF EXISTS order_items;
    DROP TABLE IF EXISTS items;
    DROP TABLE IF EXISTS orders;
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
      isAdmin BOOLEAN DEFAULT false,
      loggedIn BOOLEAN DEFAULT false,
      username varchar(255) UNIQUE NOT NULL,
      password varchar(255) NOT NULL
  );`);

  //changed order to cart because the word order is used in SQL,
  //and it was causing errors building the tables and dropping.-cb
    await client.query(`CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    userId INTEGER REFERENCES users("id"),
    totalPrice INTEGER
  );`);

  //using varchar for cost because of the '$' in the value
  //maybe switch to just numbers to make it easier to exstract?-cb
    await client.query(`CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name varchar(255) UNIQUE NOT NULL,
    description text NOT NULL,
    cost varchar(255),
    isAvailable BOOLEAN DEFAULT true
  );`);
    await client.query(`CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    orderId INTEGER REFERENCES orders(id),
    itemId INTEGER REFERENCES items(id),
    item_quantity INTEGER,
    price INTEGER
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
    console.error("Error at populate Tables",error);
  }
}
async function rebuildDb() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await populateTables();
    console.log("<----testing database----->");
    console.log("<----Users adapters----->");
    ///////////////////////////////////////////
    const allUsersResults = await getAllUsers();
    console.log("All Users:", allUsersResults);
    //
    const getUserResult = await getUser('Ced','ric');
    console.log("getUser ced:",getUserResult);
    //
    const getUserByIdResult = await getUserById(5);
    console.log("getUserById of 5:",getUserByIdResult)
    //
    const getUserByUsernameResult = await getUserByUsername('BigJoe');
    console.log("getUserByUsername:",getUserByUsernameResult);
    

    console.log("<----testing items adapters----->");
    ////////////////////////////////////////////////
    const allItemsResults = await getAllItems();
    console.log("All Itesm:", allItemsResults);
    //
    const getItemByIdResult = await getItemById(2);
    console.log("getItemById:",getItemByIdResult);
    //
    const updateItemResult = await updateItem(2,'10 gallon hat','a bid ol hat','$30',true);
    console.log("updateItem:",updateItemResult)
    //
    const getItemByIdResult2 = await getItemById(2);
    console.log("getItemById after update:",getItemByIdResult2);
    
    console.log("<----testing Orders adapter----->");
    ////////////////////////////////////////////////
    let result = await createOrder(6,100)
    console.log("createOrder:",result);
    //
    result = await getOrderById(1);
    console.log("getOrderById:",result);
    //
    result = await getAllUsersOrders(6);
    console.log("getAllUsersOrders",result);
    //
    result = await getAllOrdersByUsername("Ced");
    console.log("getAllOrdersByUsername:",result);
    //
    result = await updateOrder(1,2000);
    console.log("updateorder:",result);
    //
    result = await getOrderById(1);
    console.log("getOrderById after update:",result);
    //
    console.log("<----testing Orders_Items adapter----->");
    //
    result = await addItemToOrder(1,2,20,30)
    console.log("addItemToOrder:",result);
    //
    result = await getAllUsersOrders(6);
    console.log("getAllUsersOrders to test orders_Items",result);
    //
    result = await getOrderItemById(1)
    console.log("getOrderItemById:",result);
    //
    result = await getOrderItemsByOrderId(1)
    console.log("getOrderItemByOrderId:",result);
    //
    result = await updateOrderItem(1,2,30)
    console.log("updateOrderItem:",result);
    //
    result = await getAllUsersOrders(6);
    console.log("getAllUsersOrders to test orders_Items",result);
    //
    // result = await destroyOrderItem(1)
    // console.log("destroyOrderItem:",result);
    // //
    result = await getOrderItemsByOrderId(1)
    console.log("getOrderItemByOrderId to test after destroy:",result);
    //

  } catch (error) {
    console.error(error);
  } finally {
    console.log("ending client");
    client.end();
  }
}

rebuildDb();

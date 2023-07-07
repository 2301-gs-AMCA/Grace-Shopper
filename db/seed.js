const client = require("./client");
const { users, items, images, reviews } = require("./seedData");
const {
  createUser,
  getAllUsers,
  getUser,
  getUserById,
  getUserByUsername,
  updateUser,
} = require("./adapters/users");
const { createReviewsTable } = require("./adapters/reviews");
const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
} = require("./adapters/items");
const {
  createOrder,
  getOrderById,
  updateOrder,
  getAllUsersOrders,
  getAllOrdersByUsername,
} = require("./adapters/order");
const {
  getOrderItemById,
  addItemToOrder,
  getOrderItemsByOrderId,
  updateOrderItem,
  destroyOrderItem,
} = require("./adapters/order_items");
const {
  createImagesTable,
  getAllImages,
  getImagesByItemId,
} = require("./adapters/assets");
const {
  createCart,
  getUsersCart,
  getAllCarts,
  getCartById,
  updateCart,
  destroyCart,
} = require("./adapters/cart");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
async function dropTables() {
  console.log("Dropping tables...");
  try {
    await client.query(`
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS review_imgs;
    DROP TABLE IF EXISTS order_items;
    DROP TABLE IF EXISTS cart_items;
    DROP TABLE IF EXISTS items_images_throughtable;
    DROP TABLE IF EXISTS items_imgs;
    DROP TABLE IF EXISTS items;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS cart;
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

    await client.query(`CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    userId INTEGER REFERENCES users(id),
    totalPrice INTEGER
  );`);

    await client.query(`CREATE TABLE cart (
      id SERIAL PRIMARY KEY,
      userId INTEGER REFERENCES users(id),
      totalPrice INTEGER
    );`);

    //changed cost to INTEGER -cb
    //added category -ac
    await client.query(`CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name varchar(255) UNIQUE NOT NULL,
    description text NOT NULL,
    cost INTEGER,
    category varchar(255) NOT NULL,
    isAvailable BOOLEAN DEFAULT true
  );`);

    //images for items

    await client.query(`CREATE TABLE items_imgs (
    id SERIAL PRIMARY KEY,
    itemId INTEGER REFERENCES items(id),
    image varchar(255)
  );`);

  //   await client.query(`CREATE TABLE review_imgs (
  //   id SERIAL PRIMARY KEY,
  //   reviewId INTEGER REFERENCES reviews(id),
  //   imageId INTEGER REFERENCES items_imgs(itemId),

  //   image varchar(255)
  // );`);

    await client.query(`CREATE TABLE items_images_throughtable (
    id SERIAL PRIMARY KEY,
    itemId INTEGER REFERENCES items(id),
    imageId INTEGER REFERENCES items_imgs(id) UNIQUE NOT NULL
  );`);

    await client.query(`CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    orderId INTEGER REFERENCES orders(id),
    itemId INTEGER REFERENCES items(id),
    item_quantity INTEGER,
    price INTEGER
  );`);

    await client.query(`CREATE TABLE cart_items (
      id SERIAL PRIMARY KEY,
      cartId INTEGER REFERENCES cart(id),
      itemId INTEGER REFERENCES items(id),
      item_quantity INTEGER,
      price INTEGER
    );`);

    await client.query(`CREATE TABLE reviews(
    id SERIAL PRIMARY KEY,
    itemId INTEGER REFERENCES items(id),
    userId INTEGER REFERENCES users(id),
    title varchar(255),
    rating int2 NOT NULL CHECK(rating between 1 and 5),
    review TEXT
   
    
    
  );`);
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

    for (const img of images) {
      await createImagesTable(img);
    }
    console.log("reviews list:", reviews);
    for (const review of reviews) {
      await createReviewsTable(review);
    }
    console.log("Tables populated!");
  } catch (error) {
    console.error("Error at populate Tables", error);
  }
}
async function rebuildDb() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await populateTables();
    console.log("<----testing database----->");

    ///////////////////////////////////////////
    async function userAdapterTests() {
      console.log("<----Users adapters----->");
      const allUsersResults = await getAllUsers();
      console.log("All Users:", allUsersResults);
      //
      const getUserResult = await getUser("Ced", "ric");
      console.log("getUser ced:", getUserResult);
      //
      const getUserByIdResult = await getUserById(5);
      console.log("getUserById of 5:", getUserByIdResult);
      //
      const getUserByUsernameResult = await getUserByUsername("BigJoe");
      console.log("getUserByUsername:", getUserByUsernameResult);

      const result = await updateUser({ id: 4, username: "chungus" });
      console.log("UpdateUser:", result);
    }

    ////////////////////////////////////////////////
    async function itemAdapterTests() {
      console.log("<----testing items adapters----->");
      const allItemsResults = await getAllItems();
      console.log("All Itesm:", allItemsResults);
      //
      const getItemByIdResult = await getItemById(2);
      console.log("getItemById:", getItemByIdResult);
      //
      // const updateItemResult = await updateItem(2);
      // console.log("updateItem:",updateItemResult)
      // //
      const getItemByIdResult2 = await getItemById(2);
      console.log("getItemById after update:", getItemByIdResult2);
      //
      const getImages = await getAllImages();
      console.log("getAllImages", getImages);
    }

    ////////////////////////////////////////////////
    async function ordersAdapterTest() {
      console.log("<----testing Orders adapter----->");
      let result = await createOrder(6, 100);
      console.log("createOrder:", result);
      //
      result = await getOrderById(1);
      console.log("getOrderById:", result);
      //
      result = await getAllUsersOrders(6);
      console.log("getAllUsersOrders", result);
      //
      result = await getAllOrdersByUsername("Ced");
      console.log("getAllOrdersByUsername:", result);
      //
      result = await updateOrder(1, 2000);
      console.log("updateorder:", result);
      //
      result = await getOrderById(1);
      console.log("getOrderById after update:", result);
      //
      console.log("<----testing Orders_Items adapter----->");
      //
      result = await addItemToOrder(1, 2, 20, 30);
      console.log("addItemToOrder:", result);
      //
      result = await getAllUsersOrders(6);
      console.log("getAllUsersOrders to test orders_Items", result);
      //
      result = await getOrderItemById(1);
      console.log("getOrderItemById:", result);
      //
      result = await getOrderItemsByOrderId(1);
      console.log("getOrderItemByOrderId:", result);
      //
      result = await updateOrderItem(1, 2, 30);
      console.log("updateOrderItem:", result);
      //
      result = await getAllUsersOrders(6);
      console.log("getAllUsersOrders to test orders_Items", result);
      //
      result = await destroyOrderItem(1);
      console.log("destroyOrderItem:", result);
      //
      result = await getOrderItemsByOrderId(1);
      console.log("getOrderItemByOrderId to test after destroy:", result);
      //
    }

    //////////////////////////////////////////////////////////////////
    // builds a small list of orders and joins them to the order_items table on user 2,Matt R
    async function jointableTestsandpopulation() {
      console.log("<----testing joins and populating----->");
      let cost = 20;
      let result = "";
      for (let i = 0; i < 11; i++) {
        result = await createOrder(2, cost);
        console.log("createOrder:", result);
        cost = cost - 1;
      }
      for (let i = 0; i < 9; i++) {
        let cost = 20;
        result = await addItemToOrder(2 + i, 2, 20 - i, 30);
        console.log("addItemToOrder:", result);
        //
      }
      result = await getAllUsersOrders(2);
      console.log("getAllUsersOrders to test orders_Items", result);
      //
      result = await getAllOrdersByUsername("Matt R");
      console.log("getAllOrdersByUsername:", result);
      //
      result = await getImagesByItemId(2);
      console.log("getImageByItemId", result);
    }

    /////////////////////////////////////////////////////////////////////////
    /// calling functions
    await userAdapterTests();
    await itemAdapterTests();
    await ordersAdapterTest();
    await jointableTestsandpopulation();
    ////////////////////////////////////////////////////////////////////////
    console.log("<-------hashing Passwords------>");
    for (let i = 0; i < users.length; i++) {
      const hashedpassword = await bcrypt.hash(users[i].password, SALT_ROUNDS);
      let updatedUser = await updateUser({
        id: i + 1,
        password: hashedpassword,
      });
      console.log("updated user:", updatedUser);
    }

    console.log("<----creating admin----->");
    const hashedPassword = await bcrypt.hash("password", SALT_ROUNDS);
    let result = await createUser({
      username: "admin",
      password: hashedPassword,
      isAdmin: true,
      loggedIn: true,
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  } finally {
    console.log("ending client");
    client.end();
  }
}

rebuildDb();

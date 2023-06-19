const itemsRouter = require("express").Router();
const { getAllItems, createItem, updateItem } = require("../db/adapters/items");
const { addItemToOrder } = require("../db/adapters/order_items");
const { authRequired } = require("./utils");

itemsRouter.use((req, res, next) => {
  console.log("A request is being made to /items");
});

//GET /api/items
itemsRouter.get("/", async (req, res) => {
  const items = await getAllItems();

  res.send({
    success: true,
    message: "Got Items",
    items,
  });
});

//POST /api/items
itemsRouter.post("/", authRequired, async (req, res, next) => {
  const { name, description, cost } = req.body;
  const itemsObj = {};
  try {
    itemsObj.name = name;
    itemsObj.description = description;
    itemsObj.cost = cost;

    const item = await createItem(itemObj);

    if (item) {
      res.send({
        success: true,
        message: "Item created",
        item,
      });
    } else {
      next({
        name: "CreateItemError",
        message: "Null value in required field",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//PATCH /api/items/:itemId
itemsRouter.patch("/:itemsId", authRequired, async (req, res, next) => {
  const { itemId } = req.params;
  const { name, description, cost, isAvailable } = req.body;
  const updateItemsObj = {};

  if (name) {
    updateItemsObj.name = name;
  }
  if (description) {
    updateItemsObj.description = description;
  }
  if (cost) {
    updateItemsObj.cost = cost;
  }
  if (!null) {
    updateItemsObj.isAvailable = isAvailable;
  }

  try {
    if (req.user.isAdmin) {
      const updatedItem = await updateItem(
        itemId,
        name,
        description,
        cost,
        isAvailable
      );
      res.send({
        success: true,
        message: "Item updated",
        item: updatedItem,
      });
    } else {
      next({
        name: "UnauthorizedUserError",
        message: "You cannot update an item unless you are an admin",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = itemsRouter;

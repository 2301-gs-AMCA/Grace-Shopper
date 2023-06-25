const itemsRouter = require("express").Router();
const {
  getAllItems,
  createItem,
  updateItem,
  getItemById,
} = require("../db/adapters/items");
const { authRequired } = require("./utils");

itemsRouter.use((req, res, next) => {
  console.log("A request is being made to /items");
  next();
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
  if (req.user.isadmin != true) {
    res.send({ message: "you are not an admin" });
    return;
  }
  const { name, description, cost } = req.body;
  const itemsObj = {};
  try {
    itemsObj.name = name;
    itemsObj.description = description;
    itemsObj.cost = cost;

    const item = await createItem(itemsObj);

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
itemsRouter.patch("/:itemId", authRequired, async (req, res, next) => {
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
    if (req.user.isadmin) {
      const updatedItem = await updateItem(
        itemId,
        name,
        description,
        cost,
        isAvailable
      );
      console.log("updating item:", updatedItem);
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

//GET /api/items/:itemId
itemsRouter.get("/:itemId", async (req, res, next) => {
  const { itemId } = req.params;
  const item = await getItemById(itemId);

  res.send({
    success: true,
    message: "got item",
    item,
  });
});

module.exports = itemsRouter;

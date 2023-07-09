const itemsRouter = require("express").Router();

const { getItemByImage } = require("../db/adapters/assets");
const {
  getAllItems,
  getItemsByCategory,
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

//GET /api/items/:itemId
itemsRouter.get("/:itemId", async (req, res) => {
  const { itemId } = req.params;
  const item = await getItemById(itemId);
  console.log("item route", item);
  res.send({
    success: true,
    message: "Got Item",
    item,
  });
});

/*
//GET /api/items/:category
itemsRouter.get("/:category", async (req, res) => {
  const { category } = req.params;
  const items = await getItemsByCategory(category);
  res.send({
    success: true,
    message: "Got Category Items",
    items,
  });
});
*/



//POST /api/items
itemsRouter.post("/", authRequired, async (req, res, next) => {
  if (req.user.isadmin != true) {
    res.send({ message: "you are not an admin" });
    return;
  }
  const {itemObj} = req.body
  console.log("newItem Obj:",itemObj)
  try {
    const item = await createItem(itemObj);

    if (item) {
      res.send({
        success: true,
        message: `${item.name} is added to shop`,
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
  if (req.user.isadmin != true) {
    res.send({ message: "you are not an admin" });
    return;
  }
  const { itemId } = req.params;
  const {itemObj} =  req.body;
 
  try {
    if (req.user.isadmin) {
      const updatedItem = await updateItem(itemObj);
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

module.exports = itemsRouter;

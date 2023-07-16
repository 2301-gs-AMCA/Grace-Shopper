const order_itemsRouter = require("express").Router();
const {
  getOrderItemById,
  addItemToOrder,
  updateOrderItem,
  destroyOrderItem,
  getOrderItemsByOrderId,
} = require("../db/adapters/order_items");
const { getOrderById } = require("../db/adapters/order");
const { authRequired } = require("./utils");
const { getItemById } = require("../db/adapters/items");

order_itemsRouter.use((req, res, next) => {
  console.log("A request is being made to activity_routines");
  next();
});

//POST api/order_items
order_itemsRouter.post("/", authRequired, async (req, res, next) => {
  const { orderId, itemId, item_quantity } = req.body;
  const ordItmData = {};

  try {
    ordItmData.orderId = orderId;
    ordItmData.itemId = itemId;
    ordItmData.item_quantity = item_quantity;

    const orderItem = await addItemToOrder(orderId, itemId, item_quantity);

    if (orderItem) {
      res.send({
        success: true,
        message: "item added to order",
        orderItem,
      });
    } else {
      next({
        name: "Error",
        message: "Null value in required field",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

order_itemsRouter.get("/:orderId", async (req, res, next) => {
  try {
    const order_items = await getOrderItemsByOrderId(req.params.orderId);
    res.send({
      success: true,
      message: "Order Items",
      order_items,
    });
  } catch (error) {
    next(error);
  }
});

//PATCH api/order_items/:orderItemid
order_itemsRouter.patch(
  "/:orderItemId",
  authRequired,
  async (req, res, next) => {
    const { orderItemId } = req.params;
    const { item_quantity } = req.body;
    const updateOrderItemObj = {};

    if (item_quantity) {
      updateOrderItemObj.item_quantity = item_quantity;
    }

    try {
      const originalOrderItem = await getOrderItemById(orderItemId);
      const order = await getOrderById(originalOrderItem.orderId);
      console.log("getOrderById in patch order_items", order);
      if (order.userId === req.user.id || req.user.isAdmin) {
        const updatedOrderItem = await updateOrderItem(
          orderItemId,
          item_quantity
        );
        res.send({ order_item: updatedOrderItem });
      } else {
        next({
          name: "UnathorizedUserError",
          message: "You cannot update a order item that isn't yours",
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

order_itemsRouter.delete(
  "/:orderItemId",
  authRequired,
  async (req, res, next) => {
    const { orderItemId } = req.params;
    try {
      const orderItem = await getOrderItemById(orderItemId);
      const order = await getOrderById(orderItem.orderId);
      const item = await getItemById(orderItem.itemId);
      if (orderItem && (order.userId === req.user.id || req.user.isAdmin)) {
        const deletedOrderItem = await destroyOrderItem(orderItemId);
        const returnOrder = await getOrderById(order.id);
        res.send({
          message: `${item.name} is deleted from order ${order.id}`,
          order: returnOrder,
        });
      } else {
        next(
          orderItem
            ? {
                name: "UnauthorizedUserError",
                message: "You are not authorized to delete a order item",
              }
            : {
                name: "OrderItemNotFoundError",
                message: "That order item does not exist",
              }
        );
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

module.exports = order_itemsRouter;

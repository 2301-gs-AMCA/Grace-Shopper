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

order_itemsRouter.use((req, res, next) => {
  console.log("A request is being made to activity_routines");
});

//POST api/order_items
order_itemsRouter.post("/", async (req, res, next) => {
  const { orderId, itemId, item_quantity, price } = req.body;
  const { order } = req.order;
  const { item } = req.item;
  const ordItmData = {};

  try {
    ordItmData.orderId = orderId;
    ordItmData.itemId = itemId;
    ordItmData.item_quantity = item_quantity;
    ordItmData.price = price;
    const orderItem = await addItemToOrder(
      orderId,
      itemId,
      item_quantity,
      price
    );

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

order_itemsRouter.patch(
  "/:orderItemId",
  authRequired,
  async (req, res, next) => {
    const { orderItemId } = req.params;
    const { item_quantity, price } = req.body;
    const updateOrderItemObj = {};

    if (item_quantity) {
      updateOrderItemObj.item_quantity = item_quantity;
    }
    if (price) {
      updateOrderItemObj.price = price;
    }

    try {
      const originalOrderItem = await getOrderItemById(orderItemId);
      const order = await getOrderById(originalOrderItem.orderId);
      if (order.userId === req.user.id || req.user.isAdmin) {
        const updatedOrderItem = await updateOrderItem(
          orderItemId,
          item_quantity,
          price
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
      const orderItem = await getOrderById(orderItemId);
      const order = await getOrderById(orderItem.orderId);
      if (orderItem && (order.userId === req.user.id || req.user.isAdmin)) {
        const deletedOrderItem = await destroyOrderItem(orderItemId);
        res.send({ order_item: deletedOrderItem });
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

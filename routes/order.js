const orderRouter = require("express").Router();
const {
  createOrder,
  getOrderById,
  getAllUsersOrders,
  getAllOrders,
  getAllOrdersByUsername,
  updateOrder,
} = require("../db/adapters/order");
const { authRequired } = require("./utils");

orderRouter.use((req, res, next) => {
  console.log("A request is being bade to /order");
  next();
});

//GET /orders
orderRouter.get("/", async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.send({
      success: true,
      message: "All orders fetched",
      orders,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//GET /orders/myOrders
orderRouter.get("/myOrders", authRequired, async (req, res, next) => {
  try {
    const orders = await getAllOrdersByUsername(req.user.username);
    res.send({ success: true, message: "My Orders ", orders });
  } catch (error) {
    next(error);
  }
});

//GET /orders/userOrders
orderRouter.get("/:userId", authRequired, async (req, res, next) => {
  try {
    const orders = await getAllUsersOrders(req.params.userid);
    res.send({
      success: true,
      message: "Found orders",
      orders,
    });
  } catch (error) {
    next(error);
  }
});

//POST /order
orderRouter.post("/", authRequired, async (req, res, next) => {
  const { totalPrice } = req.body;
  const { id } = req.user;

  try {
    let userId = id;
    const order = await createOrder(userId, totalPrice);

    res.send({
      success: true,
      message: "Order posted",
      order,
    });
  } catch (error) {
    next(error);
  }
});

//GET /orders/:orderId
orderRouter.get("/:orderId", async (req, res, next) => {
  try {
    const order = await getOrderById(req.params.orderId);
    res.send({
      success: true,
      message: "Found Order",
      order,
    });
  } catch (error) {
    next(error);
  }
});

// PATCH /order/:orderId
orderRouter.patch("/:orderId", authRequired, async (req, res, next) => {
  const { orderId } = req.params;
  const { totalPrice } = req.body;
  const updateOrderObj = {};

  if (totalPrice) {
    updateOrderObj.totalPrice = totalPrice;
  }

  try {
    const originalOrder = await getOrderById(orderId);

    if (originalOrder.userid === req.user.id || req.user.isadmin) {
      const updatedOrder = await updateOrder(orderId, totalPrice);
      res.send({
        success: true,
        message: "Order Updated",
        order: updatedOrder,
      });
    } else {
      next({
        name: "UnauthorizedUserError",
        message: "You cannot update this order",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = orderRouter;

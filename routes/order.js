const orderRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const {
  createOrder,
  getOrderById,
  getAllUsersOrders,
  getAllOrders,
  getAllOrdersByUsername,
  updateOrder,
  getUsersLastOrder,
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

orderRouter.get("/lastOrder", authRequired, async (req, res, next) => {
  try {
    user = req.user;
    const order = await getUsersLastOrder(user.id);
    if (order.isCart) {
      res.cookie("order", order);
      res.send({ success: true, message: "Is Cart", order });
    }
  } catch (error) {
    next(error);
  }
});

//GET /orders/userOrders
orderRouter.get("/:userId", authRequired, async (req, res, next) => {
  try {
    const orders = await getAllUsersOrders(req.params.userId);
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
  try {
    const { userId } = req.body;
    const _orders = await getAllUsersOrders(userId);
    const _order = _orders[_orders.length - 1];
    console.log(_order);
    if (_orders.length && _order.isCart) {
      res.send({
        success: false,
        error: {
          message: "You already have a cart",
          name: "Cart Error",
        },
      });
      return;
    }

    const order = await createOrder(userId);

    res.cookie("order", order, {
      sameSite: "strict",
      httpOnly: true,
    });

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
  const updateOrderObj = {};

  if (totalPrice) {
    updateOrderObj.totalPrice = totalPrice;
  }

  try {
    const originalOrder = await getOrderById(orderId);

    if (originalOrder.userId === req.user.id || req.user.isAdmin) {
      const modifiedOrder = await updateOrder(orderId);

      const orderCookie = req.cookies.order;

      const updatedOrder = { ...orderCookie, ...modifiedOrder };

      res.cookie("order", updatedOrder, {
        sameSite: "strict",
        httpOnly: true,
      });

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

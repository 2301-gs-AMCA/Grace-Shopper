const cartRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const { authRequired } = require(`./utils`);
const {
  createCart,
  getUsersCart,
  getAllCarts,
  getCartById,
  updateCart,
  destroyCart,
} = require("../db/adapters/cart");

orderRouter.use((req, res, next) => {
  console.log("A request is being bade to /order");
  next();
});

//GET /carts
cartRouter.get("/", async (req, res, next) => {
  try {
    const carts = await getAllCarts();
    res.send({
      success: true,
      message: "All orders fetched",
      carts,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//GET /cart/userId
cartRouter.get("/:userId", authRequired, async (req, res, next) => {
  try {
    const cart = await getUsersCart(req.params.userid);
    res.send({
      success: true,
      message: "Found orders",
      cart,
    });
  } catch (error) {
    next(error);
  }
});

//POST /cart
cartRouter.post("/", async (req, res, next) => {
  const { userId } = req.body;

  try {
    const cart = await createCart(userId);

    res.send({
      success: true,
      message: "Cart posted",
      cart,
    });
  } catch (error) {
    next(error);
  }
});

//GET /cart/:cartId
cartRouter.get("/:cartId", async (req, res, next) => {
  try {
    const cart = await getCartById(req.params.cartId);
    res.send({
      success: true,
      message: "Found Cart",
      cart,
    });
  } catch (error) {
    next(error);
  }
});

// PATCH /cart/:cartId
cartRouter.patch("/:cartId", authRequired, async (req, res, next) => {
  const { cartId } = req.params;
  const { totalPrice } = req.body;
  const updateCartObj = {};

  if (totalPrice) {
    updateCartObj.totalPrice = totalPrice;
  }

  try {
    const originalCart = await getCartById(cartId);

    if (originalCart.userid === req.user.id || req.user.isadmin) {
      const updatedCart = await updateCart(cartId, totalPrice);
      res.send({
        success: true,
        message: "Cart Updated",
        order: updatedCart,
      });
    } else {
      next({
        name: "UnauthorizedUserError",
        message: "You cannot update this cart",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = orderRouter;

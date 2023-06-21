const router = require("express").Router();

// GET /api/health
router.get("/health", (req, res, next) => {
  res.send({
    message: "Api is up and healthy!",
  });
});

// HOOK UP ROUTERS
const usersRouter = require("./users");
router.use("/users", usersRouter);
const orderRouter = require("./order");
router.use("/order", orderRouter);
const order_itemsRouter = require("./order_items");
router.use("/order_items", order_itemsRouter);
const itemsRouter = require("./items");
router.use("/items", itemsRouter);
const authRouter = require("./auth");
router.use("/auth", authRouter);

router.use((error, req, res, next) => {
  res.send({
    name: error.name,
    message: error.message,
  });
});

module.exports = router;

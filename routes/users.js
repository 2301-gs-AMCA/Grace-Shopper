const usersRouter = require("express").Router();
const { getAllUsers } = require("../db/adapters/users");
const { getAllOrdersByUsername } = require("../db/adapters/order");

// MAKING REQUEST TO /users
usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");
  next();
});

//GET /api/users
usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send({
      success: true,
      users: users,
    });
  } catch (error) {
    next(error);
  }
});

//GET /api/users/:username/routines
usersRouter.get("/:username/orders", async (req, res, next) => {
  const { username } = req.params;
  try {
    const orders = await getAllOrdersByUsername(username);
    if (orders) {
      res.send(orders);
    } else {
      next({
        name: "NoOrderError",
        message: "No Orders Found for that user",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = usersRouter;

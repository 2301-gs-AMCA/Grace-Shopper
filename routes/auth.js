const authRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const { createUser, getUserByUsername } = require("../db/adapters/users");
const { authRequired } = require("./utils");
const {
  createOrder,
  getAllUsersOrders,
  getAllOrdersByUsername,
  getUsersLastOrder,
} = require("../db/adapters/order");

//GET /api/auth
authRouter.get("/", async (req, res, next) => {
  res.send({
    message: "you are in auth",
  });
});

//POST /api/auth/register
authRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    //Check if user already exists
    const _user = await getUserByUsername(username);
    if (_user) {
      res.status(401);
      res.send({
        success: false,
        error: {
          message: "That user already exists!",
          name: "Auth Error",
        },
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await createUser({
      username,
      password: hashedPassword,
      isAdmin: false,
      isGuest: false,
    });
    console.log("user:", user);
    delete user.password;
    const token = jwt.sign(user, process.env.JWT_SECRET);

    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });

    res.send({
      success: true,
      message: "Thank You for signing up!",
      user: user,
    });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/guest", async (req, res, next) => {
  try {
    let randomNum = Math.floor(Math.random() * 9000) + 1000; // Generates a random 4-digit number
    let username = "guest" + randomNum;
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (var i = 0; i < 8; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    const user = await createUser({
      username,
      password,
      isAdmin: false,
      isGuest: true,
    });
    delete user.password;
    const token = jwt.sign(user, process.env.JWT_SECRET);

    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    res.send({
      success: true,
      message: "You are a guest!",
      user: user,
    });
  } catch (error) {
    next(error);
  }
});

// POST api/auth/login
authRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.send({
      success: false,
      error: {
        name: "MissingCredentialsError",
        message: "Please supply both a username and password",
      },
    });
  }

  try {
    const user = await getUserByUsername(username);
    if (!user) {
      res.status(401);
      res.send({
        success: false,
        error: {
          message: "There is no user with that username!",
          name: "Auth Error",
        },
      });
      return;
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        console.error(err);
        return;
      }
      if (result) {
        console.log("password correct");

        delete user.password;
        const token = jwt.sign(user, process.env.JWT_SECRET);

        res.cookie("token", token, {
          sameSite: "strict",
          httpOnly: true,
          signed: true,
        });

        res.send({
          success: true,
          message: "You're logged in!",
          user: user,
        });
      } else {
        res.send({
          success: false,
          error: {
            name: "IncorrectCredentialsError",
            message: "password is incorrect",
          },
        });
      }
    });
  } catch (error) {
    next(error);
  }
});

// GET api/auth/logout
authRouter.get("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    res.send({
      success: true,
      message: "Logged Out!",
    });
  } catch (error) {
    next(error);
  }
});

// GET api/auth/me
authRouter.get("/me", authRequired, async (req, res, next) => {
  const _user = await getUserByUsername(req.user.username);
  if (!_user) {
    res.status(401);
    res.send({
      success: false,
      error: {
        message: "There is no user with that username!",
        name: "Auth Error",
      },
    });
    return;
  } else {
    res.send({
      success: true,
      message: "you are authorized",
      user: req.user,
    });
  }
});

//GET /orders/myOrders
authRouter.get("/myCart", authRequired, async (req, res, next) => {
  try {
    const order = await getUsersLastOrder(req.user.id);
    console.log("get last order: ", order);
    if (order && order.isCart) {
      res.cookie("order", order);
      res.send({
        success: true,
        message: "Here's your cart",
        order: order,
      });
    } else {
      res.send({
        success: false,
        message: "No cart",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = authRouter;

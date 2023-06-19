const authRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const { createUser, getUserByUsername } = require("../db/adapters/users");
const { authRequired } = require("./utils");

//POST /api/auth/register
authRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    //Check if user already exists
    const _user = await getUserByUsername(username);
    if (_user) {
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
    const user = await createUser({ username, password: hashedPassword });
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
authRouter.get("/me", authRequired, (req, res, next) => {
  res.send({
    success: true,
    message: "you are authorized",
    user: req.user,
  });
});

module.exports = authRouter;

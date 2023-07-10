const jwt = require("jsonwebtoken");
const { createUser } = require("../db/adapters/users");

function requireUser(req, res, next) {
  if (!req.user) {
    next({
      name: "missingUserError",
      message: "You must be logged in to perform this action",
    });
  }
  next();
}

/*async function createGuest(req, res, next) {
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
    loggedIn: false,
  });
  console.log(user);
  return user;
}*/

const authRequired = (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    req.user = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "You are not authorized!!!",
    });
    return;
  }
  next();
};

module.exports = { requireUser, authRequired };

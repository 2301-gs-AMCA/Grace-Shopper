const jwt = require("jsonwebtoken");

function requireUser(req, res, next) {
  if (!req.user) {
    next({
      name: "missingUserError",
      message: "You must be logged in to perform this action",
    });
  }
  next();
}

const authRequired = (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Req.user: ", req.user);
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

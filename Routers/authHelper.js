// let flag = false; ////user logged in or not

const jwt = require("jsonwebtoken");
// const JWT_KEY = require("./secrets.js");
// const JWT_KEY = "rbfywg837bfuiwebf";
const JWT_KEY = require("../secrets");

function protectRoute(req, res, next) {
  if (req.cookies.login) {
    console.log(req.cookies);
    let isVerified = jwt.verify(req.cookies.login, JWT_KEY);
    if (isVerified) {
      next();
    } else {
      res.json({
        message: "user not verified",
      });
    }
  } else {
    return res.json({
      message: "user not allowed",
    });
  }
}

module.exports = protectRoute;

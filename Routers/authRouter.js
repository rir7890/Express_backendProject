const express = require("express");
const authRouter = express.Router();
const cookieParser = require("cookie-parser");
const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
// const JWT_KEY = "rbfywg837bfuiwebf";
const JWT_KEY = require("../secrets");

authRouter
  .route("/signup")
  .get(middleware1, getSignUp, middleware2)
  .post(postSignUp);

authRouter.route("/login").post(loginUser);

function middleware1(req, res, next) {
  console.log("middleware1 encountered");
  next();
}

function middleware2(req, res) {
  console.log("middleware2 encountered");
  //   next();
  console.log("middle ware 2 ended req/res cycle");
  res.sendFile("/public/index.html", { root: __dirname });
}

async function getSignUp(req, res, next) {
  console.log("get signup calleds");
  //   res.sendFile("/public/index.html", { root: __dirname });
  next();
}

async function postSignUp(req, res) {
  // let obj = req.body;
  // console.log("backend ", obj);
  let dataObj = req.body;
  let user = await userModel.create(dataObj);
  // console.log(dataObj);
  res.json({
    message: "user signed up",
    data: user,
  });
}

async function loginUser(req, res) {
  try {
    let data = req.body;
    if (data.email) {
      let user = await userModel.findOne({ email: data.email });
      //bycrypt -> compare
      if (user) {
        if (user.password == data.password) {
          let uid = user["_id"];
          ////this jwt contain payload,uid,key that is why, it will be called jwt
          let token = jwt.sign({ payload: uid }, JWT_KEY);
          res.cookie("login", token, {
            httpOnly: true,
          });
          return res.json({
            message: "user has logged in ",
            userDetails: data,
          });
        } else {
          return res.json({
            message: "wrong credentials",
          });
        }
      } else {
        return res.json({
          message: "user not found",
        });
      }
    } else {
      return res.json({
        message: "Empty field found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

module.exports = authRouter;

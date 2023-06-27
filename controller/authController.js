const express = require("express");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const JWT_KEY = require("../secrets");

//SIGN UP user
module.exports.signup = async function signup(req, res) {
  try {
    let dataObj = req.body;
    let user = await userModel.create(dataObj);
    if (user) {
      res.json({
        message: "user signed up",
        data: user,
      });
    } else {
      res.json({
        message: "error while signing up",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

//login user
module.exports.login = async function login(req, res) {
  try {
    let data = req.body;
    if (data.email) {
      let user = await userModel.findOne({ email: data.email });
      if (user) {
        //bycrypt -> compare
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
          message: "user not found3",
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
};

//isAuthorised -> to check if the users role restaurant,deleiverys

module.exports.isAuthorised = function isAuthorised(roles) {
  return function (req, res, next) {
    if (roles.includes(req.role) == true) {
      next();
    } else {
      res.status(401).json({
        message: "operation not allowed isAuthorised",
      });
    }
  };
};

//protect route
module.exports.protectRoute = async function protectRoute(req, res, next) {
  try {
    let token;
    if (req.cookies.login) {
      // console.log(req.cookies);
      token = req.cookies.login;
      let payload = jwt.verify(token, JWT_KEY);
      ////// {payload:sfghjytdyui} => payload example
      if (payload) {
        console.log("payload token", payload);
        const user = await userModel.findById(payload.payload);
        req.role = user.role;
        req.id = user.id;
        console.log(req.role, req.id);
        next();
      } else {
        return res.json({
          message: "user not verified",
        });
      }
    } else {
      //browser
      const client = req.get("User-Agent");
      if (client.includes("Google") == true) {
        return res.redirect("/login");
      }
      //postman
      return res.json({
        message: "please login ",
      });
    }
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
};

////forget password
module.exports.forgetpassword = async function forgetpassword(req, res) {
  let { emailv } = req.body;
  try {
    const user = await userModel.findOne({ email: emailv });
    if (user) {
      //createresetToken is used to create a new token
      const resetToken = user.createResetToken();
      ////example => https://abc.com/resetpassword/resetToken
      let resetPasswordLink = `${req.protocol}://${req.get(
        "host"
      )}/resetpassword/${resetToken}`;
      //send email to the user
      //nodemailer
    } else {
      return res.json({
        message: "user is null in forget password // please sign up",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

//reset password
module.exports.resetpassword = async function resetpassword(req, res) {
  try {
    const token = req.params.token;
    let { password, confirmPassword } = req.body;
    const user = await userModel.findOne({ resetToken: token });
    if (user) {
      ////it will update users password in db
      user.resetPasswordHandler(password, confirmPassword);
      await user.save();
      return res.json({
        message: "user password change successfully / please login again",
      });
    } else {
      return res.json({
        message: "user is not found4",
      });
    }
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
};

module.exports.logout = function logout(req, res) {
  res.cookie("login", "", { maxAge: 1 });
  res.json({
    message: "user logged out succssfully ",
  });
};

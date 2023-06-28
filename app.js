const express = require("express");
// const bodyParser = require("body-parser");
const _ = require("lodash");
const cors = require("cors");

// const mongoose = require("mongoose");
// const emailValidator = require("email-validator");
// const bcrypt = require("bcrypt");
// const userModel = require("./models/userModel.js");

const cookieParser = require("cookie-parser");
const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.listen(3000, () => {
  console.log("it is listening on the port number 3000");
});

// let users = [
//   {
//     id: 1,
//     name: "rahul",
//   },
//   {
//     id: 2,
//     name: "rohit",
//   },
//   {
//     id: 3,
//     name: "kiran",
//   },
// ];
// const userRouter = express.Router();

const userRouter = require("./Routers/userRouter.js");
const planRouter = require("./Routers/planRouter.js");
// const bodyParser = require("body-parser");
const reviewRouter = require("./Routers/reviewRouter.js");
// const authRouter = express.Router();
// const authRouter = require("./Routers/authRouter.js");

app.use("/user", userRouter);
app.use("/plans", planRouter);
app.use("/review", reviewRouter);

// app.use("/auth", authRouter);

// const planModel = require("./models/planModel.js");

// userRouter
//   .route("/")
//   .get(getUser)
//   .post(postUserId)
//   .patch(updateUser)
//   .delete(deleteUser);

// userRouter.route("/getCookies").get(getCookies);
// userRouter.route("/setCookies").get(setCookies);

// userRouter.route("/:id").get(getUserById);

// async function getUser(req, res) {
//   //   console.log("get the all the list of the user on the post man");
//   // res.json(users);
//   console.log("bring all the user from the mongodb");
//   let allUsers = await userModel.find(); //// display all the value of the data
//   // let allUsers = await userModel.findOne({ name: "abhishek" });
//   res.json({
//     message: "list of the all users",
//     data: allUsers,
//   });
// }

// async function postUserId(req, res) {
//   // console.log("send the data by the post");
//   // console.log("always use raw and json selected option");
//   // console.log(req.body);
//   // users.push(req.body);
//   let dataObj = req.body;
//   let user = await userModel.create(dataObj);
//   res.json({
//     message: "data has been send by the help",
//     user: req.body,
//   });
// }

// async function updateUser(req, res) {
//   console.log("req.body -> ", req.body);
//   let dataToUpdate = req.body;
//   let user = await userModel.findOneAndUpdate(
//     { email: "abcd@gmail.com" },
//     dataToUpdate
//   );
//   // for (k in users) {
//   //   if (users[k]["id"] == dataToUpdate.id) {
//   //     users[k]["name"] = dataToUpdate.name;
//   //   }
//   // }
//   res.json({
//     message: "data updated",
//     data: user,
//   });
// }

// async function deleteUser(req, res) {
//   //// users = {};
//   let dataToBeDeleted = req.body;
//   let user = await userModel.findOneAndDelete(dataToBeDeleted);

//   res.json({
//     message: "all the message has been deleted",
//     data: user,
//   });
// }

// function getUserById(req, res) {
//   console.log(req.params.id);
//   let paramId = req.params.id;
//   let obj = {};
//   for (let i = 0; i < users.length; i++) {
//     if (users[i]["id"] == paramId) {
//       obj = users[i];
//     }
//   }
//   res.json({
//     message: "request received",
//     data: obj,
//   });
// }

// authRouter
//   .route("/signup")
//   .get(middleware1, getSignUp, middleware2)
//   .post(postSignUp);

// function middleware1(req, res, next) {
//   console.log("middleware1 encountered");
//   next();
// }

// function middleware2(req, res) {
//   console.log("middleware2 encountered");
//   //   next();
//   console.log("middle ware 2 ended req/res cycle");
//   res.sendFile("/public/index.html", { root: __dirname });
// }

// async function getSignUp(req, res, next) {
//   console.log("get signup calleds");
//   //   res.sendFile("/public/index.html", { root: __dirname });
//   next();
// }

// async function postSignUp(req, res) {
//   // let obj = req.body;
//   // console.log("backend ", obj);
//   let dataObj = req.body;
//   let user = await userModel.create(dataObj);
//   // console.log(dataObj);
//   res.json({
//     message: "user signed up",
//     data: user,
//   });
// }

// function setCookies(req, res) {
//   // res.setHeader("Set-Cookie", "isLoggedIn=true");
//   //// this cookie logged is only seen on the http server on backend
//   res.cookie("isLoggedIn", true, {
//     maxAge: 1000 * 60 * 60 * 24,
//     secure: true,
//     httpOnly: true,
//   });
//   ////this cookie isPrime is seen on the front end
//   res.cookie("isPrimeMember", true);
//   res.send("cookies has been set");
// }

// function getCookies(req, res) {
//   //// let cookies = req.cookies;
//   let cookies = req.cookies.isLoggedIn;
//   console.log(cookies);
//   res.send("cookies received");
// }

// ////mongodb connection
// const db_link =
//   "mongodb+srv://Rahulyt:Rahul9899@cluster0.mdaciex.mongodb.net/?retryWrites=true&w=majority";

// mongoose
//   .connect(db_link)
//   .then(function (db) {
//     // console.log(db);////all the information about the mongodb in object form on the console
//     console.log("database is connected");
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

// //schema we have to form after connection
// const userSchema = mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     Validiate: function () {
//       return emailValidator.validate(this.email);
//     },
//   },
//   password: {
//     type: String,
//     required: true,
//     minLength: 8,
//   },
//   confirmPassword: {
//     type: String,
//     required: true,
//     minLength: 8,
//     validate: function () {
//       return this.confirmPassword == this.password;
//     },
//   },
// });

// // ////this pre and post always comes before the user model
// // ////this pre and post both are middleware
// // ////pre post hooks
// // //after save event occurs in db
// // userSchema.pre("save", function () {
// //   console.log("before saving in the data base", this);
// // });

// // //before save event occurs in db
// // userSchema.post("save", function (doc) {
// //   console.log("after saving in the data base", doc);
// // });
// //remove - explore on your own

// userSchema.pre("save", function () {
//   this.confirmPassword = undefined;
// });

// //model to form
// const userModel = mongoose.model("userModel", userSchema);

// // (async function createUser() {
// //   let user = {
// //     name: "abhishek",
// //     email: "abcd@gmail.com",
// //     password: "989996556",
// //     confirmPassword: "989996556",
// //   };
// //   let data = await userModel.create(user);
// //   ////data=user
// //   console.log(data);
// // })();

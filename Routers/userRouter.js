const express = require("express");
const app = express();
const userRouter = express.Router();
const cookieParser = require("cookie-parser");
// const protectRoute = require("./authHelper.js");
const {
  getUser,
  updateUser,
  deleteUser,
  getAllUser,
} = require("../controller/userController.js");

const {
  signup,
  login,
  isAuthorised,
  protectRoute,
  forgetpassword,
  resetpassword,
  logout,
} = require("../controller/authController.js");

// userRouter
//   .route("/")
//   .get(protectRoute, getUsers)
//   .post(postUser)
//   .patch(updateUser)
//   .delete(deleteUser);
// userRouter.route("/getCookies").get(getCookies);
// userRouter.route("/setCookies").get(setCookies);
// userRouter.route("/:id").get(getUserById);

////user ke options
userRouter.route("/:id").patch(updateUser).delete(deleteUser);

////user signup
userRouter.route("/signup").post(signup);

////user login
userRouter.route("/login").post(login);

////forget the password
userRouter.route("/forgetpassword").post(forgetpassword);

////reset the password and reset the token and (/resetPassword/token) then save age of new password in database
userRouter.route("/resetpassword/:token").post(resetpassword);

////logout the user
userRouter.route("/logout").get(logout);

////profile page
userRouter.use(protectRoute);
userRouter.route("/userProfile").get(getUser);

//admin specific function
userRouter.use(isAuthorised(["admin"]));
userRouter.route("/").get(getAllUser);

module.exports = userRouter;

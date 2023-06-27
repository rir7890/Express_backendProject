////mongodb connection
const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const db_link = "mongodb://127.0.0.1:27017/foodAppData";

mongoose
  .connect(db_link)
  .then(function (db) {
    // console.log(db);////all the information about the mongodb in object form on the console
    console.log("database is connected");
  })
  .catch(function (err) {
    console.log(err);
  });

//schema we have to form after connection
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    Validate: function () {
      return emailValidator.validate(this.email);
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  confirmPassword: {
    type: String,
    minLength: 8,
    validate: function () {
      return this.confirmPassword == this.password;
    },
  },
  role: {
    type: String,
    enum: ["admin", "user", "restaurantowner", "deliveryboy"],
    default: "user",
  },
  profileImage: {
    type: String,
    default: "img/users/default.jpeg",
  },
  resetToken: String,
});

// ////this pre and post always comes before the user model
// ////this pre and post both are middleware
// ////pre post hooks
// //after save event occurs in db
// userSchema.pre("save", function () {
//   console.log("before saving in the data base", this);
// });

// //before save event occurs in db
// userSchema.post("save", function (doc) {
//   console.log("after saving in the data base", doc);
// });
//remove - explore on your own

userSchema.pre("save", function () {
  this.confirmPassword = undefined;
});

// userSchema.pre("save", async function () {
//   let salt = await bcrypt.genSalt();
//   let hashedSrting = await bcrypt.hash(this.password, salt);
//   // console.log(hashedSrting);
//   this.password = hashedSrting;
// });

userSchema.methods.createResetToken = function () {
  //creating usnique token using npm i crypto (it is deprecated)
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetToken = resetToken;
  return resetToken;
};

userSchema.methods.resetPasswordHandler = function (password, confirmPassword) {
  this.password = password;
  this.confirmPassword = confirmPassword;
  this.resetToken = undefined;
};

//model to form
const userModel = mongoose.model("userModel", userSchema);

// (async function createUser() {
//   let user = {
//     name: "abhishek",
//     email: "abcd@gmail.com",
//     password: "989996556",
//     confirmPassword: "989996556",
//   };
//   let data = await userModel.create(user);
//   ////data=user
//   console.log(data);
// })();

module.exports = userModel;

const userModel = require("../models/userModel.js");

module.exports.getUser = async function getUser(req, res) {
  //   console.log("get the all the list of the user on the post man");
  // res.json(users);
  // console.log("bring all the user from the mongodb");
  let id = req.id;
  let user = await userModel.findById(id); //// display all the value of the data
  // let allUsers = await userModel.findOne({ name: "abhishek" });
  // console.log(user);
  if (user) {
    return res.json(user);
  } else {
    return res.json({
      message: "user not found1",
    });
  }
};

// module.exports.postUser = async function postUser(req, res) {
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
// };

module.exports.updateUser = async function updateUser(req, res) {
  // console.log("req.body -> ", req.body);
  try {
    let id = req.params.id;
    let user = await userModel.findById(id);
    console.log(user);
    let dataToUpdated = req.body;

    if (user) {
      const keys = [];
      for (let key in dataToUpdated) {
        keys.push(key);
      }

      for (let i = 0; i < keys.length; i++) {
        user[keys[i]] = dataToUpdated[keys[i]];
      }

      const updatedData = await user.save();

      res.json({
        message: "data updated successfully",
        data: user,
      });
    } else {
      res.json({
        message: "user not found 2",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.deleteUser = async function deleteUser(req, res) {
  //// users = {};
  try {
    let id = req.params.id;
    let user = await userModel.findByIdAndDelete(id);
    if (!user) {
      res.json({
        message: "user not found",
      });
    }
    res.json({
      message: "all the message has been deleted",
      data: user,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.getAllUser = async function getAllUser(req, res) {
  // console.log(req.params.id);
  // let paramId = req.params.id;
  // let obj = {};
  // for (let i = 0; i < users.length; i++) {
  //   if (users[i]["id"] == paramId) {
  //     obj = users[i];
  //   }
  // }
  let users = await userModel.find();
  if (users) {
    res.json({
      message: "users retrived ",
      data: users,
    });
  } else {
    res.json({
      message: "no data is their in dataBase",
    });
  }
};

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

module.exports.updateProfileImage = async function updateProfileImage(
  req,
  res
) {
  res.json({
    message: "file uploaded successfully",
  });
};

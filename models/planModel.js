//mongoose connect
const mongoose = require("mongoose");
const db_link = "mongodb://127.0.0.1:27017/foodAppData";

mongoose
  .connect(db_link)
  .then(function (db) {
    // console.log(db);////all the information about the mongodb in object form on the console
    console.log("plan database is connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: [20, "paln name should not exceed more than 20 characters"],
  },
  duration: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: [true, "price not entered"],
  },
  ratingsAverage: {
    type: Number,
  },
  discount: {
    type: Number,
    validate: [
      function () {
        return this.discount < 100;
      },
      "dicount should not exceed price",
    ],
  },
});

//model
const planModel = mongoose.model("planModel", planSchema);

// (async function createPlan() {
//   let planObj = {
//     name: "SuperFood1",
//     duration: 30,
//     price: 1000,
//     ratingsAverage: 5,
//     discount: 20,
//   };
//   let data = await planModel.create(planObj);
//   //   const doc = new planModel(planObj);
//   //   await doc.save();
//   console.log(data);
// })();

module.exports = planModel;

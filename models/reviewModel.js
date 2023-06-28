const mongoose = require("mongoose");

const db_link = "mongodb://127.0.0.1:27017/foodAppData";
mongoose
  .connect(db_link)
  .then(function (db) {
    // console.log(db);////all the information about the mongodb in object form on the console
    console.log("reviews db is connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const reviewSchema = mongoose.Schema({
  review: {
    type: String,
    required: [true, "review is required"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "rating is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "userModel",
    required: [true, "review must belong to a user"],
  },
  plan: {
    type: mongoose.Schema.ObjectId,
    ref: "planModel",
    required: [true, "review must belong to a plan"],
  },
});

//find findByID , findOne
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name profileImage",
  }).populate("plan");
  next();
});

const reviewModel = mongoose.model("reviewModel", reviewSchema);

module.exports = reviewModel;

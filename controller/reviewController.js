const reviewModel = require("../models/reviewModel");
const planModel = require("../models/planModel");
const { updatePlan } = require("../controller/planController");

module.exports.getAllReviews = async function getAllReviews(req, res) {
  try {
    const reviews = await reviewModel.find();
    if (reviews) {
      return res.json({
        message: "reviews retrieved",
        data: reviews,
      });
    } else {
      return res.json({
        message: "review not found 1",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message + " ( getAllReviews function error ) ",
    });
  }
};

module.exports.top3reviews = async function top3reviews(req, res) {
  try {
    const reviews = await reviewModel
      .find()
      .sort({
        rating: -1,
      })
      .limit(3);
    if (reviews) {
      return res.json({
        message: "3 reviews retrieved",
        data: reviews,
      });
    } else {
      return res.json({
        message: "3 review not found 2",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message + " ( top3reviews function error ) ",
    });
  }
};

module.exports.getPlanReviews = async function getPlanReviews(req, res) {
  try {
    const id = req.params.id;
    const review = await reviewModel.find(id);
    if (review) {
      return res.json({
        message: "review retrieved",
        data: review,
      });
    } else {
      return res.json({
        message: "review not found 3",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message + " ( getPlanReviews function error ) ",
    });
  }
};

module.exports.createReview = async function createReview(req, res) {
  try {
    let id = req.params.plan;
    let plan = await planModel.findById(id);
    let review = await reviewModel.create(req.body);
    plan.ratingsAverage = (plan.ratingsAverage + req.body.rating) / 2;
    await plan.save();
    return res.json({
      message: "review created",
      data: review,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message + " ( createReview function error ) ",
    });
  }
};

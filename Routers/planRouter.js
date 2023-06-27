const express = require("express");
// const app = express();
const planRouter = express.Router();
const { protectRoute, isAuthorised } = require("../controller/authController");
const {
  getPlan,
  getAllPlans,
  createPlan,
  updatePlan,
  deletePlan,
  top3Plans,
} = require("../controller/planController");

//all plans leke aayega
planRouter.route("/allPlans").get(getAllPlans);

//own plan --. logged in must to get the plan
planRouter.use(protectRoute);
planRouter.route("/plan/:id").get(getPlan);

//admin and restaurant owner can only create , update and delete plan
planRouter.use(isAuthorised(["admin", "restaurantowner"]));
planRouter.route("/crudPlan").post(createPlan);
planRouter.route("/crudPlan/:id").patch(updatePlan).delete(deletePlan);
//top 3 plan
planRouter.route("/top3").get(top3Plans);

module.exports = planRouter;

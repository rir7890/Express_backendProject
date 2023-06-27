const planModel = require("../models/planModel");

module.exports.getAllPlans = async function getAllPlans(req, res) {
  try {
    let plans = await planModel.find();
    if (plans) {
      return res.json({
        message: "all plans retrieved 1",
        data: plans,
      });
    } else {
      return res.json({
        message: "plans not found 1",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message + "|| ( getallplans function error ) ",
    });
  }
};

module.exports.getPlan = async function getPlan(req, res) {
  try {
    let id = req.params.id;
    let plans = await planModel.findById(id);
    if (plans) {
      return res.json({
        message: "plan retrieved 2",
        data: plans,
      });
    } else {
      return res.json({
        message: "plan not found 2",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message + "|| ( getplan function error )",
    });
  }
};

module.exports.createPlan = async function createPlan(req, res) {
  try {
    let planData = req.body;
    let createdPlan = await planModel.create(planData);
    return res.json({
      message: "plan created succesfully",
      data: createdPlan,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message + " ( getplan function error ) ",
    });
  }
};

module.exports.deletePlan = async function deletePlan(req, res) {
  try {
    let id = req.params.id;
    let deletedData = await planModel.findByIdAndDelete(id);
    if (deletedData) {
      return res.json({
        message: "plan is deleted succesfully",
        data: deletedData,
      });
    } else {
      return res.json({
        message: "plan id is not found to be deleted",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message + " ( deleteplan function error ) ",
    });
  }
};

module.exports.updatePlan = async function updatePlan(req, res) {
  try {
    let id = req.params.id;
    let dataToBeUpdated = req.body;
    console.log(id);
    console.log(dataToBeUpdated);
    let keys = [];
    for (let key in dataToBeUpdated) {
      keys.push(key);
    }
    let plan = await planModel.findById(id);
    if (plan) {
      for (let i = 0; i < keys.length; i++) {
        plan[keys[i]] = dataToBeUpdated[keys[i]];
      }
      await plan.save();
      return res.json({
        message: "plan is updated succesfully",
        data: plan,
      });
    } else {
      return res.json({
        message: "plan id is not found",
      });
    }
    // let updatedData = await planModel.findByIdAndUpdate(id, dataToBeUpdated);
    // if (updateData) {
    //   return res.json({
    //     message: "plan is updated succesfully",
    //     data: updatedData,
    //   });
    // } else {
    //   return res.json({
    //     messsage: "plan id is not found to be updated",
    //   });
    // }
  } catch (err) {
    return res.status(500).json({
      message: err.message + " ( updatePlan funcion error ) ",
    });
  }
};

//get top 3 plans
module.exports.top3Plans = async function top3Plans(req, res) {
  try {
    const plans3 = await planModel
      .find()
      .sort({
        ratingsAverage: -1,
      })
      .limit(3);
    return res.json({
      messsage: "top3 plans ",
      data: plans3,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message + " ( top3plans function error ) ",
    });
  }
};

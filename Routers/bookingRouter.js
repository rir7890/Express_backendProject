const express = require("express");
const bookingRouter = express.Router();
const { protectRoute } = require("../controller/authController");

const { createSession } = require("../controller/bookingController");
bookingRouter.post("/createSession", protectRoute, createSession);
bookingRouter.get("/createSession", function (req, res) {
  res.sendFile("F:/webdevelopment/MongoDb/booking.html");
});

module.exports = bookingRouter;

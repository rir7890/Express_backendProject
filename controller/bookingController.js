// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51NNrfVSJST42dl7A3uZ9PqrURbo4mbcACscgiW2bW8tkNvaskYKF1p9o7FF0hiC9g9s2LXwEH7Z7KC21njB8F7UP00s3RZibkK"
);
const planModel = require("../models/planModel");
const userModel = require("../models/userModel");

// const express = require("express");
// const app = express();
// app.use(express.static("public"));

// const YOUR_DOMAIN = "http://localhost:4242";

// app.post("/create-checkout-session", async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         price: "{{PRICE_ID}}",
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     success_url: `${YOUR_DOMAIN}/success.html`,
//     cancel_url: `${YOUR_DOMAIN}/cancel.html`,
//   });

//   res.redirect(303, session.url);
// });

// app.listen(4242, () => console.log("Running on port 4242"));

module.exports.createSession = async function createSession(req, res) {
  try {
    let userId = req.id;
    let planId = req.params.id;
    const user = await userModel.findById(userId);
    const plan = await planModel.findById(planId);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: user.email,
      client_refernce_id: plan.id,
      line_items: [
        {
          name: plan.name,
          description: plan.description,
          //deploy website
          amount: plan.price * 100,
          currency: "inr",
          quantity: 1,
        },
      ],
      success_url: `${req.protocol}://${req.get("host")}/profile`,
      cancel_url: `${req.protocol}://${req.get("host")}/profile`,
    });
    res.status(200).json({
      status: "success",
      session,
    });
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
};

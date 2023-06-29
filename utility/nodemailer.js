const nodemailer = require("nodemailer");

module.exports.sendMail = async function sendMail(str, data) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, ////true for 465 , false for others
    auth: {
      user: "rir7890@gmail.com", ////generate ethernal ports
      pass: "rviecjmvdeorywje", ////generate ethereal password
    },
  });

  var Osubject, Otext, Ohtml;
  if (str == "signup") {
    Osubject = `Thank you for signing ${data.name}`;
    Ohtml = `
    <h1>welcome to foodApp.com</h1>
    Hope you have a good time.
    Here are your details --
    Name -> ${data.name}
    Email -> ${data.email}
    `;
  } else if (str == "resetpassword") {
    Osubject = `Reset Password`;
    Ohtml = `
    <h1>foodApp.com</h1>
    Here is your link to reset your password
    ${data.resetPasswordLink}
    `;
  }

  let info = await transporter.sendMail({
    from: "'FoodApp ##' <rir7890@gmail.com>", ////sender address <${userObj.email}
    to: data.email, ////list of receivers
    subject: Osubject, ////subject line
    html: Ohtml, ///html body
  });
  console.log("message sent: %s", info.messageId);
};

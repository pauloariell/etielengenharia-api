function createMailer() {
  console.log(`[START] SEND MAIL`)
  console.log(`[CONFIGMAIL] INSTANCIE OBJECTS`);

  const nodemailer = require("nodemailer");
  const hbs = require("nodemailer-express-handlebars");
  const path = require('path');

  console.log(`[CONFIGMAIL] INSTANCIE TRANSPORTER`);
  var transporter = nodemailer.createTransport({
    host: "smtp.umbler.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  console.log(`[CONFIGMAIL] CONFIG TEMPLATE`);
  transporter.use('compile', hbs({
    viewEngine: {
      extName: '.hbs',
      partialsDir: path.join(__dirname, "../views"),
      defaultLayout: false
    },
    viewPath: path.join(__dirname, "../views"),
    extName: '.hbs'
  }));

  async function sendMail(data, callback, callbackError) {
    console.log(`[SENDMAIL] CONFIG INFO`);
    let mailOptions = {
      from: `"PACCode 👻"<${process.env.EMAIL}>`, // sender address
      to: data.emailto, // list of receivers
      subject: data.subject, // Subject line
      template: 'welcome'
    };
    console.log(`[SENDMAIL] TRY TO SEND MAIL`);

    try {
      let info = await transporter.sendMail(mailOptions);
      console.log(`information${info}`);
      callback(info)
    } catch (err) {
      console.log(`[error]${e}`)
      const error = {
        responseCode: err.responseCode || 500,
        message: err.message
      }
      callbackError(error)
    }
  };
  //start();

  return { sendMail };
};
module.exports = createMailer;
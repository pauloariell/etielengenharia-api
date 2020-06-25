const mailTemplate = require('./mailOptionTemplate');

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
      partialsDir: path.resolve(__dirname, '../../views'),
      defaultLayout: false
    },
    viewPath: path.resolve(__dirname, '../../views'),
    extName: '.hbs'
  }));

  async function contactUs(data, callback, callbackError){
    let error = [];
    let sucess = [];

    console.log(`[SENDMAIL] CONFIG INFO`);
    let mailOptionsEtiel = mailTemplate.contactUsTemplateEtiel(data);

    console.log(`[SENDMAIL] TRY TO SEND MAIL`);

    await sendMail(mailOptionsEtiel, info => {
      sucess.push(info)
    },
    error => {
      return callbackError(error);
    })
    
    //////////////////////////////////////
    console.log(`[SENDMAIL] CONFIG INFO`);
    let mailOptions = mailTemplate.contactUsTemplateCli(data);

    console.log(`[SENDMAIL] TRY TO SEND MAIL`);

    await sendMail(mailOptions, info => {
      sucess.push(info)
    },
    error => {
      return callbackError(error);
    })   

    return callback(sucess);
  }

  async function sendMail(mailOptions, callback, callbackError) {
    try {
      let info = await transporter.sendMail(mailOptions);
      console.log(`information${info}`);
      callback(info)
    } catch (err) {
      console.log(`[error]${err}`)
      const error = {
        responseCode: err.responseCode || 500,
        message: err.message
      }
      callbackError(error)
    }
  };

  return { contactUs };
};
module.exports = createMailer;
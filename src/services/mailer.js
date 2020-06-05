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

  function contactUsTemplateCli(body) {
    let mailOptions = {
      from: `"ETIEL Engenharia"<${process.env.EMAIL}>`, // sender address
      to: body.email, // list of receivers
      subject: "ETIEL Engenharia - Contato", // Subject line
      template: 'ContactUsCli',
      context:{
        name: body.name
      }
    };
    return mailOptions;
  }

  function contactUsTemplateEtiel(body) {
    console.log(`[BODY]${JSON.stringify(body)}`)
    let mailOptions = {
      from: `"ETIEL Engenharia"<${process.env.EMAIL}>`, // sender address
      to: process.env.EMAILCONTATO, // list of receivers
      subject: "[SITE] Contato ETIEL Engenharia", // Subject line
      template: 'ContactUsEtiel',
      context:{
        name: body.name,
        email: body.email,
        phone: body.phone,
        description: body.description
      }
    };
    console.log(`[mailOptions]${JSON.stringify(mailOptions)}`)
    return mailOptions;
  }

  async function contactUs(data, callback, callbackError){
    console.log(`[SENDMAIL] CONFIG INFO`);
    let mailOptions = contactUsTemplateCli(data);

    console.log(`[SENDMAIL] TRY TO SEND MAIL`);

    let error = [];
    let sucess = [];

    await sendMail(mailOptions, info => {
      sucess.push(info)
      // return callback(info);
    },
    error => {
      // error.push(error)
      return callbackError(error);
    })
    /////////////////////////////////////////////////////////////////////////
     
    console.log(`[SENDMAIL] CONFIG INFO`);
    let mailOptionsEtiel = contactUsTemplateEtiel(data);

    console.log(`[SENDMAIL] TRY TO SEND MAIL`);

    await sendMail(mailOptionsEtiel, info => {
      sucess.push(info)
      // return callback(info);
    },
    error => {
      // error.push(error)
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
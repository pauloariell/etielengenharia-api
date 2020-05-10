const nodemailer = require("nodemailer");

async function send(data, callback, error) {
  let transporter = nodemailer.createTransport({
    host: "smtp.umbler.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  let mailOptions = {
    from: '"PACCode 👻" <paulo.chaves@paccode.com.br>', // sender address
    to: data.emailto, // list of receivers
    subject: data.text, // Subject line
    html: "<b>Hello ETIEL Engenharia</b>" // html body
  }

  try {
    let info = await transporter.sendMail(mailOptions);
    callback(info)
  } catch (e) {
    error(e)
  }
}

module.exports = {
  async sendMail(req, res) {
    send(req.body, info => {
      console.log(`the mail has beed send :) and the id is ${info.messageId}`);
      return res.send(info);
    },
    error => {
      res.status(error.responseCode);
      return res.send(error.response);
    })
  }
}
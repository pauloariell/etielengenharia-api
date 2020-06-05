const createMailer = require('../services/mailer');
const mailer = createMailer();

module.exports = {
  async ContactUs(req, res) {
    await mailer.sendMail(req.body, info => {
      //console.log(`the mail has beed send :) and the id is ${info.messageId}`);
      return res.send(info);
    },
    error => {
      console.log(`[ERROR Status]${error.responseCode}`);
      console.log(`[ERROR Message]${error.message}`)

      res.status(error.responseCode);
      return res.send(error);
    })
  }
}
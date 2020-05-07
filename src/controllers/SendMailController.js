const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "mail.diegopinho.com.br",
  port: 25,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "no-reply@diegopinho.com",
    pass: "senhaqualquerdeteste"
  },
  tls: { rejectUnauthorized: false }
});

module.exports = {
  // async..await is not allowed in global scope, must use a wrapper
  async sendMail(req,res) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass // generated ethereal password
      }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: `bar@example.com, baz@example.com, ${req.body.emailto}`, // list of receivers
      subject: "Hello ✔", // Subject line
      text: req.body.text, // plain text body
      html: `"<b>Hello world?</b>"` // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    console.log(req.body.text);
    return await res.json("Message sent: " + info.messageId);
  }
}
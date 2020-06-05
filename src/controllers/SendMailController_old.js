


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

  transporter.use('compile', hbs({
    viewEngine: {
      extName: '.hbs',
      partialsDir: path.join(__dirname, "../views"),
      defaultLayout: false
    },
    viewPath: path.join(__dirname, "../views"),
    extName: '.hbs'
  }));

  console.log(`[Pasta de templetes] ${path.resolve('src/views/')}`);

  console.log(`[config dados de email]`);
  let mailOptions = {
    from: `"PACCode 👻"<${process.env.EMAIL}>`, // sender address
    to: data.emailto, // list of receivers
    subject: data.subject, // Subject line
    template: 'welcome'
    //cc: data.emailto,
    //bcc: data.emailto,
    //text: 'Bem vindo a ETIEL Engenharia',
    //html: `<b>${data.text}</b>` // html body
    // attachments: [
      //   { filename: 'picture.jpg', path: './picture.jpg'}
      // ],
    }
    
  console.log(`[enviando email]`);
  try {
    let info = await transporter.sendMail(mailOptions);
    callback(info)
  } catch (e) {
    console.log(`[error]${e}`)
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
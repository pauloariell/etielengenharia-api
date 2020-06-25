module.exports = {
  contactUsTemplateCli(body) {
    let mailOptions = {
      from: `"ETIEL Engenharia"<${process.env.EMAIL}>`, // sender address
      to: body.email, // list of receivers
      subject: "ETIEL Engenharia - Contato", // Subject line
      template: 'ContactUsCli',
      context: {
        name: body.name
      }
    };
    return mailOptions;
  },
  contactUsTemplateEtiel(body) {
    console.log(`[BODY]${JSON.stringify(body)}`)
    let mailOptions = {
      from: `"ETIEL Engenharia"<${process.env.EMAIL}>`, // sender address
      to: process.env.EMAILCONTATO, // list of receivers
      subject: "[SITE] Contato ETIEL Engenharia", // Subject line
      template: 'ContactUsEtiel',
      context: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        description: body.description
      }
    };
    console.log(`[mailOptions]${JSON.stringify(mailOptions)}`)
    return mailOptions;
  }
};
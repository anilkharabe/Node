// ./mail.js
const nodemailer = require("nodemailer");
const fs = require('fs');
const path = require('path')
const handlebars = require('handlebars');


let transporter;
const createTrasporter = async()=>{
    console.log('createTrasporter is running')
    const testAccount =await nodemailer.createTestAccount();

    transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}




const compileTemplate = (templateName, data)=>{
    const filePath = path.join(__dirname, 'templates', `${templateName}.hbs`)
    const source = fs.readFileSync(filePath, 'utf8')
    const template = handlebars.compile(source)

    return template(data);
}


const sendEmail = async ({to, subject, templateName, data})=>{
    createTrasporter()

    template = compileTemplate(templateName, data)
    const info = await transporter
    .sendMail({
      from: "Example App <no-reply@example.com>",
      to: to,
      subject: subject,
      html: template,
    })

    console.log("Message sent: %s", info.messageId);
      // Get a URL to preview the message in Ethereal's web interface
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = {sendEmail}

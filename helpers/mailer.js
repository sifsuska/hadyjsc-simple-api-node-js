const nodemailer = require('nodemailer');
const smtp = require('nodemailer-smtp-transport'); 
const transporter = nodemailer.createTransport(
  {
    service: process.env.SERVICE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    }
  }
)

module.exports = (mailOptions) => {
  mailOptions.from = process.env.EMAIL;

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return reject(err);
      }
      resolve(info)
    })
  })
}
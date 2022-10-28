const nodemailer = require("nodemailer");

exports.mailTransport = () =>
  nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

exports.generateEmailTemplate = (name) => {
  return `
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
    @media only screen and (max-width: 620px) {
      h1 {
        font-size: 20px;
        padding: 5px;
      }
    }
    </style>
</head>
<body>
    <div>
    <div style="max-width: 620px; margin: 0 auto; font-family: sans-serif; color: #272727;">
    <h1 style="background: #f6f6f6; padding: 10px; text-align: center; color: #272727">You have been registered Successfully!</h1>
    
    <h3 style="width: 80px; margin: 0 auto; font-weight: bold; text-align: center;
    font-size: 20px;"> Welcome To Our Website: ${name}</h3>
    </div>
    </div>
</body>
</html>
    `;
};

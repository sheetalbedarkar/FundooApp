require('dotenv').config();
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

exports.sendEmailFunction = (url,email) => {
    
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: process.env.NODE_HOST,
        auth: {
            user: process.env.NODE_USER,
            pass: process.env.NODE_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    }));
    // console.log(process.env.NODE_USER,process.env.NODE_PASS);


    // setup e-mail data with unicode symbols
    const mailOptions = {
        from: process.env.NODE_USER,
        to: email,
        subject: 'link --->>> ',
        text: 'Click on the link provided :\n\n' + url
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log("Invalid username or password");
            console.log("ERROR: while sending the mail", err)
        }
        else
            console.log('Information regarding the mail sent', info);
    });
}

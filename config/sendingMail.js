const nodeMailer = require("nodemailer");


const sendMail = async (data) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodeMailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PROT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USERNAME, // generated ethereal user
            pass: process.env.EMAIL_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: process.env.EMAIL_USERNAME, // sender address
        to: data?.to, // list of receivers
        subject: data?.subject, // Subject line
        // text: data?.text, // plain text body
        html: data?.html, // html body
    });
}

module.exports = sendMail;
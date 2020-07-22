const nodemailer = require("nodemailer")


// Email Configuration

const sendEmail = (email) => {

    console.log("Enviar correo a email:", email)


    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });


    const emailOptions = {
        from: 'Poopapp <yourpoopapp@gmail.com>',
        to: 'borja.d.atienza@gmail.com',
        subject: 'Welcome!',
        text: '¡Hola! Encantados de saludarte :)'
    }

    transporter.sendMail(emailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent");
        }
    });
}

module.exports = {
    sendEmail
}
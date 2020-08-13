const nodemailer = require("nodemailer")


// Email Configuration

const sendEmail = (email, type, newpassword = null,) => {

    console.log("Enviar correo a email:", email)


    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });


    // const emailOptions = {
    //     from: 'Poopapp <yourpoopapp@gmail.com>',
    //     to: email,
    //     subject: 'Welcome!',
    //     text: '¡Hola! Encantados de saludarte :)'
    // }
    const emailOptions = () => {

        let response = null;
        switch (type) {
            case 'welcome':
                response = {
                    from: 'Poopapp: Welcome! <yourpoopapp@gmail.com>',
                    to: email,
                    subject: 'Welcome!',
                    text: '¡Hola! Encantados de saludarte :)'
                }
                break;
            case 'forgot':
                response = {
                    from: 'Poopapp: Nueva Contraseña <yourpoopapp@gmail.com>',
                    to: email,
                    subject: 'Cambio de Contraseña',
                    text: `Tu nueva contraseña es ${newpassword}`,
                }
                break;
            default:
                console.log("Algo falla en el envío de correos");
        }
        return response
    }
    transporter.sendMail(emailOptions(), function (error, info) {
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
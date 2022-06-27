const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
require("dotenv").config({path: 'variables.env'});
const fs = require('fs');
const htmlTemplete = fs.readFileSync(__dirname + '/../templates/plantilla.txt');

//crear el transporte de email
const createTrans = () => {
    const transport = nodemailer.createTransport(
        nodemailerSendgrid({
            apiKey: process.env.Key
        })
    )
    return transport;
}


//configuracion de envio de email
const sendMail = async (user) => {
    const transporter = createTrans()
    const info = await transporter.sendMail({
        from: `"Marketplace Trivago" <${process.env.Correo}>`,
        to: `${user.email}`,
        subject: `Hola ${user.nombre}, Bienvenido a Apartamentos Trivago !!`,
        html: htmlTemplete
    });

    console.log("Message sent: %s", info.messageId);

    return
}

exports.sendMail = (user) => sendMail(user);
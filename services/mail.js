const nodemailer = require('nodemailer')
const fs = require('fs')
const path = require('path')
const smtpConfig = {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
}

const textMessage = (name) => {
    return `Olá ${name}!

Um dos nossos consultores entrará em contato com você respondendo a este mesmo e-mail,
então você não precisa se preocupar.

Atenciosamente,

equipe Telzir`
}

const transporter = nodemailer.createTransport(smtpConfig)

function MailService() {

    this.send = (data) => {
        const message = {
           from: smtpConfig.auth.user,
           to: data.email,
           subject: 'Contato - FaleMais',
           text: textMessage(data.name)
       }

       return transporter.sendMail(message)
           .then(resp => console.log(resp))
           .catch(err => console.log(err))
    }
}

module.exports = MailService

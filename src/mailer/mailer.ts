import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

export const sendMail = async (
    email: string,
    subject: string,
    message: string,
    html: string
) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SERVER,
            port: process.env.EMAIL_PORT,
            service: 'gmail',
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD

            }
        }  as SMTPTransport.Options)

        const mailOptions:nodemailer.SendMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: message,
            html: html
        }

        const mailRes = await transporter.sendMail(mailOptions)
        console.log("MailRes", mailRes)

        if(mailRes.accepted.length > 0){
            return 'Email sent successfully'
        }else if(mailRes.rejected.length > 0){
            return 'Email not sent'
        }else {
            return 'Email server error'
        }
    } catch (error) {
        
    }
}
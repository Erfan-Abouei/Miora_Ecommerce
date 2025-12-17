import { ENV, logger } from "@/config"
import { SendMailOptions } from "nodemailer"
import { welcomeEmailHtmlReturner } from "./welcom-email-html-returner.utils"
import { transporter } from "@/config/node-mailer/node-mailer.config"

export const sendWelcomeEmail = async (userEmail: string) => {
    const mailOption: SendMailOptions = {
        from: `"Kara Company" <${ENV.EMAIL_FROM}>`,
        to: userEmail,
        subject: "میورا - استایلت با ما 👀",
        html: welcomeEmailHtmlReturner()
    }
    const info = await transporter.sendMail(mailOption)
    logger.info(`Welcome Email Sent For ${userEmail}: ${info.messageId}`);
}
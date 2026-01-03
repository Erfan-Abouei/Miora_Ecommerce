import type { SendMailOptions } from 'nodemailer';
import { ENV, logger, transporter } from '@/config';
import { welcomeEmailHtmlReturner } from './welcom-email-html-returner.utils';

export const sendWelcomeEmail = async (userEmail: string, dashboardCallbackRoute: string): Promise<void> => {
  const mailOption: SendMailOptions = {
    from: `"Kara Company" <${ENV.EMAIL_FROM}>`,
    to: userEmail,
    subject: 'میورا - استایلت با ما 👀',
    html: welcomeEmailHtmlReturner(dashboardCallbackRoute),
  };
  const info = await transporter.sendMail(mailOption);
  logger.info(`Welcome Email Sent For ${userEmail}: ${info.messageId}`);
};

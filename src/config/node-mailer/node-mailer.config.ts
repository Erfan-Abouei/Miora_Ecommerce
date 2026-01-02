import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import { createTransport } from 'nodemailer';
import { ENV } from '../env/env.config';

export const transporter = createTransport({
  host: ENV.EMAIL_HOST,
  port: Number(ENV.EMAIL_PORT),
  secure: Number(ENV.EMAIL_PORT) === 465, // SSL/TLS
  auth: {
    user: ENV.EMAIL_USER,
    pass: ENV.EMAIL_PASSWORD,
  },
} as SMTPTransport.Options);

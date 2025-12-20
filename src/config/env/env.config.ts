import dotenv from 'dotenv';
import path from 'path';
import { EnvConfig } from '@/types/config/env.type';

const env = process.env.NODE_ENV || 'development';
const envFile = `.env.${env}`;
const envPath = path.resolve(process.cwd(), envFile);

dotenv.config({ path: envPath });

export const ENV: EnvConfig = {
  CEO_PHONE_NUMBER: process.env.CEO_PHONE_NUMBER!,
  CEO_PASSWORD: process.env.CEO_PASSWORD!,
  CEO_EMAIL: process.env.CEO_EMAIL!,
  AUTHOR: process.env.AUTHOR!,

  APP_NAME: process.env.APP_NAME!,
  APP_URL: process.env.APP_URL!,
  APP_INSTAGRAM_LING: process.env.APP_INSTAGRAM_LING!,
  APP_LINKDIN_LINK: process.env.APP_LINKDIN_LINK!,
  APP_X_LINK: process.env.APP_X_LINK!,
  APP_DESCRIPTION: process.env.APP_DESCRIPTION!,
  APP_VERSION: process.env.APP_VERSION!,

  NODE_ENV: process.env.NODE_ENV! as 'development' | 'test' | 'production',
  PORT: Number(process.env.PORT) || 3000,
  LOG_LEVEL: (process.env.LOG_LEVEL as 'debug' | 'info' | 'warn' | 'error') || 'info',

  BCRYPT_SALT: Number(process.env.BCRYPT_SALT) || 12,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
  ACCESS_TOKEN_EXPIRES_IN: Number(process.env.ACCESS_TOKEN_EXPIRES_IN)! || 3600000,
  REFRESH_TOKEN_EXPIRES_IN: Number(process.env.REFRESH_TOKEN_EXPIRES_IN)! || 604800000,
  PASSWORD_MIN_LENGTH: Number(process.env.PASSWORD_MIN_LENGTH) || 8,
  PASSWORD_MAX_LENGTH: Number(process.env.PASSWORD_MAX_LENGTH) || 64,
  LOGIN_ATTEMPTS_MAX: Number(process.env.LOGIN_ATTEMPTS_MAX) || 5,
  LOGIN_ATTEMPTS_MAX_TIMER: Number(process.env.LOGIN_ATTEMPTS_MAX_TIMER) || 120,
  OTP_RESEND_ATTEMPS: Number(process.env.OTP_RESEND_ATTEMPS) || 3,

  DATABASE_DIALECT: process.env.DATABASE_DIALECT!,
  DATABASE_HOST: process.env.DATABASE_HOST!,
  DATABASE_PORT: Number(process.env.DATABASE_PORT) || 3306,
  DATABASE_USER: process.env.DATABASE_USER!,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD!,
  DATABASE_NAME: process.env.DATABASE_NAME!,
  DATABASE_LOGGING: process.env.DATABASE_LOGGING === 'true',

  CACHE_TTL: Number(process.env.CACHE_TTL) || 3600,
  CACHE_PERIOD: Number(process.env.CACHE_PERIOD) || 60,
  EXPIRE_OTP_TIMER: Number(process.env.EXPIRE_OTP_TIMER) || 180,

  API_RATE_LIMIT_WINDOW: Number(process.env.API_RATE_LIMIT_WINDOW) || 900000,
  API_RATE_LIMIT_MAX: Number(process.env.API_RATE_LIMIT_MAX) || 100,

  FILE_MAX_SIZE: Number(process.env.FILE_MAX_SIZE) || 5242880,
  IMAGE_MAX_WIDTH: Number(process.env.IMAGE_MAX_WIDTH) || 1920,
  IMAGE_MAX_HEIGHT: Number(process.env.IMAGE_MAX_HEIGHT) || 1080,
  ALLOWED_FILE_TYPES: process.env.ALLOWED_FILE_TYPES || 'jpg,jpeg,png,gif,webp',

  EMAIL_SERVICE: process.env.EMAIL_SERVICE,
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EMAIL_FROM: process.env.EMAIL_FROM,

  ENABLE_BETA_FEATURES: process.env.ENABLE_BETA_FEATURES === 'true',
  MAINTENANCE_MODE: process.env.MAINTENANCE_MODE === 'true',

  SWAGGER_ENABLED: process.env.SWAGGER_ENABLED === 'true',
  SWAGGER_URL: process.env.SWAGGER_URL || '/api-docs',

  TIMEZONE: process.env.TIMEZONE || 'Asia/Tehran',
  DEFAULT_LANGUAGE: process.env.DEFAULT_LANGUAGE || 'fa',
};

import type { EnvConfig } from '@/types/config/env.type';
import dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV ?? 'development';
const envFile = `.env.${env}`;
const envPath = path.resolve(process.cwd(), envFile);

dotenv.config({ path: envPath });

const getEnv = (key: string, defaultValue = ''): string => {
  const value = process.env[key];
  return value !== undefined ? value.trim() : defaultValue;
};

const getNumberEnv = (key: string, defaultValue: number): number => {
  const value = process.env[key];
  if (value === undefined) return defaultValue;

  const num = Number(value);
  return Number.isNaN(num) ? defaultValue : num;
};

const getBooleanEnv = (key: string, defaultValue = false): boolean => {
  const value = process.env[key]?.trim().toLowerCase();
  if (value === 'true' || value === '1') return true;
  if (value === 'false' || value === '0') return false;
  return defaultValue;
};

export const ENV: EnvConfig = {
  CEO_PHONE_NUMBER: getEnv('CEO_PHONE_NUMBER', ''),
  CEO_PASSWORD: getEnv('CEO_PASSWORD', ''),
  CEO_EMAIL: getEnv('CEO_EMAIL', ''),
  AUTHOR: getEnv('AUTHOR', 'Unknown'),

  APP_NAME: getEnv('APP_NAME', 'My Application'),
  APP_URL: getEnv('APP_URL', 'http://localhost:3000'),
  APP_INSTAGRAM_LING: getEnv('APP_INSTAGRAM_LING'),
  APP_LINKDIN_LINK: getEnv('APP_LINKDIN_LINK'),
  APP_X_LINK: getEnv('APP_X_LINK'),
  APP_DESCRIPTION: getEnv('APP_DESCRIPTION', ''),
  APP_VERSION: getEnv('APP_VERSION', '1.0.0'),

  NODE_ENV: env as 'development' | 'test' | 'production',
  PORT: getNumberEnv('PORT', 3000),
  LOG_LEVEL: getEnv('LOG_LEVEL', 'info') as 'debug' | 'info' | 'warn' | 'error',

  BCRYPT_SALT: getNumberEnv('BCRYPT_SALT', 12),
  JWT_ACCESS_SECRET: getEnv('JWT_ACCESS_SECRET', 'dev-secret-change-me'),
  JWT_REFRESH_SECRET: getEnv('JWT_REFRESH_SECRET', 'dev-refresh-secret-change-me'),
  ACCESS_TOKEN_EXPIRES_IN: getNumberEnv('ACCESS_TOKEN_EXPIRES_IN', 3600000),
  REFRESH_TOKEN_EXPIRES_IN: getNumberEnv('REFRESH_TOKEN_EXPIRES_IN', 604800000),
  PASSWORD_MIN_LENGTH: getNumberEnv('PASSWORD_MIN_LENGTH', 8),
  PASSWORD_MAX_LENGTH: getNumberEnv('PASSWORD_MAX_LENGTH', 64),
  REGISTER_QUEUE_TTL: getNumberEnv('REGISTER_QUEUE_TTL', 600),
  LOGIN_ATTEMPTS_MAX: getNumberEnv('LOGIN_ATTEMPTS_MAX', 5),
  LOGIN_ATTEMPTS_MAX_TIMER: getNumberEnv('LOGIN_ATTEMPTS_MAX_TIMER', 120),
  OTP_RESEND_ATTEMPS: getNumberEnv('OTP_RESEND_ATTEMPS', 3),
  OTP_RESEND_ATTEMPS_TIMER: getNumberEnv('OTP_RESEND_ATTEMPS_TIMER', 120),
  FORGOT_PASSWORD_OTP_EXPIRE_TIMER: getNumberEnv('FORGOT_PASSWORD_OTP_EXPIRE_TIMER', 180),
  FORGET_PASSWORD_REQUESTED_ATTEMPT_MAX: getNumberEnv('FORGET_PASSWORD_REQUESTED_ATTEMPT_MAX', 5),
  FORGET_PASSWORD_REQUESTED_ATTEMPT_MAX_TIMER: getNumberEnv('FORGET_PASSWORD_REQUESTED_ATTEMPT_MAX_TIMER', 120),

  DATABASE_DIALECT: getEnv('DATABASE_DIALECT', 'mysql'),
  DATABASE_HOST: getEnv('DATABASE_HOST', 'localhost'),
  DATABASE_PORT: getNumberEnv('DATABASE_PORT', 3306),
  DATABASE_USER: getEnv('DATABASE_USER', 'root'),
  DATABASE_PASSWORD: getEnv('DATABASE_PASSWORD', ''),
  DATABASE_NAME: getEnv('DATABASE_NAME', 'myapp'),
  DATABASE_LOGGING: getBooleanEnv('DATABASE_LOGGING', false),

  REDIS_USERNAME: getEnv('REDIS_USERNAME', ''),
  REDIS_PASSWORD: getEnv('REDIS_PASSWORD', ''),
  REDIS_PORT: getNumberEnv('REDIS_PORT', 6379),
  REDIS_HOST: getEnv('REDIS_HOST', 'localhost'),
  REDIS_URL: getEnv('REDIS_URL', 'redis://localhost:6379'),

  CACHE_TTL: getNumberEnv('CACHE_TTL', 3600),
  CACHE_PERIOD: getNumberEnv('CACHE_PERIOD', 60),
  EXPIRE_OTP_TIMER: getNumberEnv('EXPIRE_OTP_TIMER', 180),

  API_RATE_LIMIT_WINDOW: getNumberEnv('API_RATE_LIMIT_WINDOW', 900000),
  API_RATE_LIMIT_MAX: getNumberEnv('API_RATE_LIMIT_MAX', 100),

  FILE_MAX_SIZE: getNumberEnv('FILE_MAX_SIZE', 5242880),
  IMAGE_MAX_WIDTH: getNumberEnv('IMAGE_MAX_WIDTH', 1920),
  IMAGE_MAX_HEIGHT: getNumberEnv('IMAGE_MAX_HEIGHT', 1080),
  ALLOWED_FILE_TYPES: getEnv('ALLOWED_FILE_TYPES', 'jpg,jpeg,png,gif,webp'),

  EMAIL_SERVICE: process.env.EMAIL_SERVICE ?? undefined,
  EMAIL_HOST: process.env.EMAIL_HOST ?? undefined,
  EMAIL_PORT: process.env.EMAIL_PORT ?? undefined,
  EMAIL_USER: process.env.EMAIL_USER ?? undefined,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ?? undefined,
  EMAIL_FROM: process.env.EMAIL_FROM ?? undefined,

  ENABLE_BETA_FEATURES: getBooleanEnv('ENABLE_BETA_FEATURES', false),
  MAINTENANCE_MODE: getBooleanEnv('MAINTENANCE_MODE', false),

  SWAGGER_ENABLED: getBooleanEnv('SWAGGER_ENABLED', true),
  SWAGGER_URL: getEnv('SWAGGER_URL', '/api-docs'),

  TIMEZONE: getEnv('TIMEZONE', 'Asia/Tehran'),
  DEFAULT_LANGUAGE: getEnv('DEFAULT_LANGUAGE', 'fa'),
};

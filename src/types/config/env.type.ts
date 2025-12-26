export interface EnvConfig {
  CEO_PHONE_NUMBER: string;
  CEO_PASSWORD: string;
  CEO_EMAIL: string;
  AUTHOR: string;

  APP_NAME: string;
  APP_URL: string;
  APP_INSTAGRAM_LING: string;
  APP_LINKDIN_LINK: string;
  APP_X_LINK: string;
  APP_DESCRIPTION: string;
  APP_VERSION: string;

  NODE_ENV: 'development' | 'test' | 'production';
  PORT: number;
  LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';

  BCRYPT_SALT: number;
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
  ACCESS_TOKEN_EXPIRES_IN: number;
  REFRESH_TOKEN_EXPIRES_IN: number;
  PASSWORD_MIN_LENGTH: number;
  PASSWORD_MAX_LENGTH: number;
  REGISTER_QUEUE_TTL: number;
  LOGIN_ATTEMPTS_MAX: number;
  LOGIN_ATTEMPTS_MAX_TIMER: number;
  OTP_RESEND_ATTEMPS: number;
  OTP_RESEND_ATTEMPS_TIMER: number;
  EXPIRE_OTP_TIMER: number;

  DATABASE_DIALECT: string;
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
  DATABASE_LOGGING: boolean;

  REDIS_USERNAME: string;
  REDIS_PASSWORD: string;
  REDIS_PORT: number;
  REDIS_HOST: string;

  CACHE_TTL: number;
  CACHE_PERIOD: number;

  API_RATE_LIMIT_WINDOW: number;
  API_RATE_LIMIT_MAX: number;

  FILE_MAX_SIZE: number;
  IMAGE_MAX_WIDTH: number;
  IMAGE_MAX_HEIGHT: number;
  ALLOWED_FILE_TYPES: string;

  EMAIL_SERVICE?: string;
  EMAIL_HOST?: string;
  EMAIL_PORT?: string;
  EMAIL_USER?: string;
  EMAIL_PASSWORD?: string;
  EMAIL_FROM?: string;

  ENABLE_BETA_FEATURES: boolean;
  MAINTENANCE_MODE: boolean;

  SWAGGER_ENABLED: boolean;
  SWAGGER_URL: string;

  TIMEZONE: string;
  DEFAULT_LANGUAGE: string;
}

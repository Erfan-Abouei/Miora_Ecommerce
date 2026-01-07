export interface EnvConfig {
  // ========================= CEO =========================
  CEO_PHONE_NUMBER: string;
  CEO_PASSWORD: string;
  CEO_EMAIL: string;
  AUTHOR: string;

  // ========================= App =========================
  APP_NAME: string;
  APP_URL: string;
  APP_INSTAGRAM_LING: string;
  APP_LINKDIN_LINK: string;
  APP_X_LINK: string;
  APP_DESCRIPTION: string;
  APP_VERSION: string;

  // ========================= Environment =========================
  NODE_ENV: 'development' | 'test' | 'production';
  PORT: number;
  LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';

  // ========================= Security & Auth =========================
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
  OTP_RESEND_ATTEMPTS: number;
  OTP_RESEND_ATTEMPTS_TIMER: number;
  EXPIRE_OTP_TIMER: number;
  FORGOT_PASSWORD_OTP_EXPIRE_TIMER: number;
  FORGET_PASSWORD_REQUESTED_ATTEMPT_MAX: number;
  FORGET_PASSWORD_REQUESTED_ATTEMPT_MAX_TIMER: number;

  // ========================= Database =========================
  DATABASE_DIALECT: string;
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
  DATABASE_LOGGING: boolean;

  // ========================= Redis =========================
  REDIS_USERNAME: string;
  REDIS_PASSWORD: string;
  REDIS_PORT: number;
  REDIS_HOST: string;
  REDIS_URL: string;

  // ========================= Cache =========================
  CACHE_TTL: number;
  CACHE_PERIOD: number;

  // ========================= Rate Limit =========================
  API_RATE_LIMIT_WINDOW: number;
  API_RATE_LIMIT_MAX: number;

  // ========================= File Upload =========================
  FILE_MAX_SIZE: number;
  IMAGE_MAX_WIDTH: number;
  IMAGE_MAX_HEIGHT: number;
  ALLOWED_FILE_TYPES: string;

  // ========================= Email =========================
  EMAIL_SERVICE?: string;
  EMAIL_HOST?: string;
  EMAIL_PORT?: string;
  EMAIL_USER?: string;
  EMAIL_PASSWORD?: string;
  EMAIL_FROM?: string;

  // ========================= Feature Flags =========================
  ENABLE_BETA_FEATURES: boolean;
  MAINTENANCE_MODE: boolean;

  // ========================= Swagger =========================
  SWAGGER_ENABLED: boolean;
  SWAGGER_URL: string;

  // ========================= Misc =========================
  TIMEZONE: string;
  DEFAULT_LANGUAGE: string;
}

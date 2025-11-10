import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const ENV = {
  // node env
  NODE_ENV: process.env.NODE_ENV!,
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,

  // bcrypt env
  BCRYPT_SALT: process.env.BCRYPT_SALT ? Number(process.env.BCRYPT_SALT) : 10,

  // jwt env
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN!,
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN!,
};

export { ENV };

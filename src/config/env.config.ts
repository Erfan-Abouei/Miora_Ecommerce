import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const ENV = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
  BCRYPT_SALT: process.env.BCRYPT_SALT ? Number(process.env.BCRYPT_SALT) : 10,
};

export { ENV };

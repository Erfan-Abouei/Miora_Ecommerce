import bcrypt from 'bcryptjs';
import { ENV } from '@/config';

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, ENV.BCRYPT_SALT);
  return hashedPassword;
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  const isOkPassword = await bcrypt.compare(password, hashedPassword);
  return isOkPassword;
};

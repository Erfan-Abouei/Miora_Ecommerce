import { ENV } from '@/config';
import { CookieOptions } from 'express';

export const cookieOptionReturner = (maxAge: number): CookieOptions => {
  return {
    httpOnly: true,
    secure: ENV.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: maxAge,
  };
};

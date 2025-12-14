import { ENV } from '@/config';
import { CookieOptions } from 'express';

export const cookieOptionReturner = (maxAge: number, isLocal: boolean): CookieOptions => {
  const isProduction = ENV.NODE_ENV === 'production';

  return {
    httpOnly: true,
    secure: isProduction && !isLocal,
    sameSite: isLocal ? 'lax' : 'none',
    maxAge: maxAge,
    domain: isLocal ? undefined : '.karaflow.com',
  };
};

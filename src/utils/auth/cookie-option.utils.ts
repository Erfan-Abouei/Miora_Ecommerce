import type { CookieOptions } from 'express';
import { ENV } from '@/config';

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

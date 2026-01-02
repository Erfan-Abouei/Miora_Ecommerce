import type { TokenPayload } from '@/types/common/basic.type';
import type { Response } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import jwt, { type SignOptions } from 'jsonwebtoken';
import { ENV } from '@/config';
import { cookieOptionReturner } from './cookie-option.utils';

export const createAccessToken = (payload: TokenPayload): string => {
  const options: SignOptions = { expiresIn: ENV.ACCESS_TOKEN_EXPIRES_IN };
  return jwt.sign(payload, ENV.JWT_ACCESS_SECRET, options);
};

export const createRefreshToken = (payload: TokenPayload): string => {
  const options: SignOptions = { expiresIn: ENV.REFRESH_TOKEN_EXPIRES_IN };
  return jwt.sign(payload, ENV.JWT_REFRESH_SECRET, options);
};

export const setAccessTokenCookie = (res: Response, token: string, isLocal: boolean): void => {
  res.cookie('access_token', token, cookieOptionReturner(ENV.ACCESS_TOKEN_EXPIRES_IN, isLocal));
};

export const setRefreshTokenCookie = (res: Response, token: string, isLocal: boolean): void => {
  res.cookie('refresh_token', token, cookieOptionReturner(ENV.REFRESH_TOKEN_EXPIRES_IN, isLocal));
};

export const setTokens = (res: Response, payload: TokenPayload, isLocal: boolean): void => {
  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

  setAccessTokenCookie(res, accessToken, isLocal);
  setRefreshTokenCookie(res, refreshToken, isLocal);
};

export const clearTokens = (res: Response, isLocal: boolean): boolean => {
  res.clearCookie('access_token', cookieOptionReturner(ENV.ACCESS_TOKEN_EXPIRES_IN, isLocal));
  res.clearCookie('refresh_token', cookieOptionReturner(ENV.REFRESH_TOKEN_EXPIRES_IN, isLocal));

  return true;
};

export const verifyAccessToken = (token: string): string | JwtPayload | null => {
  try {
    const tokenPayload = jwt.verify(token, ENV.JWT_ACCESS_SECRET);
    return tokenPayload;
  } catch {
    return null;
  }
};

export const verifyRefreshToken = (token: string): string | JwtPayload | null => {
  try {
    const tokenPayload = jwt.verify(token, ENV.JWT_REFRESH_SECRET);
    return tokenPayload;
  } catch {
    return null;
  }
};

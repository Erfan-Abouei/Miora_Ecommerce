import jwt, { JwtPayload, type SignOptions } from 'jsonwebtoken';
import { Response } from 'express';
import { ENV } from '@/config';
import { TokenPayload } from '@/types/common/basic.type';
import { cookieOptionReturner } from './cookie-option.utils';

const createAccessToken = (payload: TokenPayload): string => {
  const options: SignOptions = { expiresIn: ENV.ACCESS_TOKEN_EXPIRES_IN };
  return jwt.sign(payload, ENV.JWT_ACCESS_SECRET!, options);
};

const createRefreshToken = (payload: TokenPayload): string => {
  const options: SignOptions = { expiresIn: ENV.REFRESH_TOKEN_EXPIRES_IN };
  return jwt.sign(payload, ENV.JWT_REFRESH_SECRET!, options);
};

const setAccessTokenCookie = (res: Response, token: string, isLocal: boolean) => {
  res.cookie('access_token', token, cookieOptionReturner(ENV.ACCESS_TOKEN_EXPIRES_IN, isLocal));
};

const setRefreshTokenCookie = (res: Response, token: string, isLocal: boolean) => {
  res.cookie('refresh_token', token, cookieOptionReturner(ENV.REFRESH_TOKEN_EXPIRES_IN, isLocal));
};

const setTokens = (res: Response, payload: TokenPayload, isLocal: boolean) => {
  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

  setAccessTokenCookie(res, accessToken, isLocal);
  setRefreshTokenCookie(res, refreshToken, isLocal);
};

const clearTokens = (res: Response, isLocal: boolean): boolean => {
  res.clearCookie('access_token', cookieOptionReturner(ENV.ACCESS_TOKEN_EXPIRES_IN, isLocal));
  res.clearCookie('refresh_token', cookieOptionReturner(ENV.REFRESH_TOKEN_EXPIRES_IN, isLocal));

  return true
}

const verifyAccessToken = (token: string): string | JwtPayload | null => {
  try {
    const tokenPayload = jwt.verify(token, ENV.JWT_ACCESS_SECRET!);
    return tokenPayload;
  } catch {
    return null;
  }
};

const verifyRefreshToken = (token: string): string | JwtPayload | null => {
  try {
    const tokenPayload = jwt.verify(token, ENV.JWT_REFRESH_SECRET);
    return tokenPayload;
  } catch {
    return null;
  }
};

export { createAccessToken, createRefreshToken, setRefreshTokenCookie, setAccessTokenCookie, setTokens, clearTokens, verifyAccessToken, verifyRefreshToken };

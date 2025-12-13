import jwt, { JwtPayload, type SignOptions } from 'jsonwebtoken';
import { Response } from 'express';
import { ENV } from '@/config';
import { TokenPayload } from '@/types/common/basic.type';
import { cookieOptionReturner } from './cookie-option.utils';

const createAccessToken = (payload: TokenPayload): string => {
  const options: SignOptions = { expiresIn: +ENV.ACCESS_TOKEN_EXPIRES_IN };
  return jwt.sign(payload, ENV.JWT_ACCESS_SECRET!, options);
};

const createRefreshToken = (payload: TokenPayload): string => {
  const options: SignOptions = { expiresIn: +ENV.REFRESH_TOKEN_EXPIRES_IN };
  return jwt.sign(payload, ENV.JWT_REFRESH_SECRET!, options);
};

const setRefreshTokenCookie = (res: Response, token: string) => {
  res.cookie('refresh_token', token, {
    httpOnly: true,
    secure: ENV.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: +ENV.REFRESH_TOKEN_EXPIRES_IN,
  });
};

const setAccessTokenCookie = (res: Response, token: string) => {
  res.cookie('access_token', token, {
    httpOnly: true,
    secure: ENV.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: +ENV.ACCESS_TOKEN_EXPIRES_IN,
  });
};

const setTokens = (res: Response, payload: TokenPayload) => {
  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

  setAccessTokenCookie(res, accessToken);
  setRefreshTokenCookie(res, refreshToken);
};

const clearTokens = (res: Response): boolean => {
  res.clearCookie('access_token', cookieOptionReturner(+ENV.ACCESS_TOKEN_EXPIRES_IN));
  res.clearCookie('refresh_token', cookieOptionReturner(+ENV.REFRESH_TOKEN_EXPIRES_IN));

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

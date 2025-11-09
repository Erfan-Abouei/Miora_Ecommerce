import jwt, { type SignOptions } from 'jsonwebtoken';
import { Response } from 'express';
import { ENV } from '@/config/env.config.js';
import { TokenPayload } from '@/types/basic-type/basic.types.js';

const createAccessToken = (payload: TokenPayload): string => {
  const options: SignOptions = { expiresIn: '1h' };
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, options);
};

const createRefreshToken = (payload: TokenPayload): string => {
  const options: SignOptions = { expiresIn: '7d' };
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, options);
};

export const setRefreshTokenCookie = (res: Response, token: string) => {
  res.cookie('refresh_token', token, {
    httpOnly: true,
    secure: ENV.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const setAccessTokenCookie = (res: Response, token: string) => {
  res.cookie('access_token', token, {
    httpOnly: true,
    secure: ENV.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 1000,
  });
};

export const setTokens = (res: Response, payload: TokenPayload) => {
  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

  setAccessTokenCookie(res, accessToken);
  setRefreshTokenCookie(res, refreshToken);
};

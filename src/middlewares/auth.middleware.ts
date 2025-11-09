import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '@/config/env.config.js';
import { createAccessToken, createRefreshToken, setAccessTokenCookie, verifyAccessToken, verifyRefreshToken } from '@/utils/jwt.utils.js';
import { TokenPayload } from '@/types/basic-type/basic.types.js';
import { errorResponse } from '@/utils/api-response-handler.utils.js';
import { ErrorCode } from '@/constants/error-constants/ERROR_CODE.constants.js';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies['access_token'];
  const refreshToken = req.cookies['refresh_token'];

  if (!accessToken) {
    errorResponse<{ login: boolean }>(res, 401, 'لطفا وارد شوید و دوباره ادامه دهید.', ErrorCode.FORBIDDEN, { login: false });
    return;
  }

  try {
    const payload = verifyAccessToken(accessToken) as TokenPayload;
    req.user = payload;
    return next();
  } catch (err) {
    if (!refreshToken) {
      errorResponse<{ login: boolean }>(res, 401, 'به نظر میرسد ارتباط قطع شده است. لطفا دوباره وارد شوید.', ErrorCode.FORBIDDEN, { login: false });
      return;
    }

    try {
      const refreshPayload = verifyRefreshToken(refreshToken) as TokenPayload;

      const newAccessToken = createAccessToken(refreshPayload);
      setAccessTokenCookie(res, newAccessToken);

      req.user = refreshPayload;
      return next();
    } catch (refreshErr) {
      errorResponse<{ login: boolean }>(res, 401, 'لطفا وارد شوید و دوباره ادامه دهید.', ErrorCode.FORBIDDEN, { login: false });
      return;
    }
  }
};

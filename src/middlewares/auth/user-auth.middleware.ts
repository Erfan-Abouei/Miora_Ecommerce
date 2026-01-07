import type { Request, Response, NextFunction } from 'express';
import type { TokenPayload, AuthUserQueryType } from '@/types';
import { createAccessToken, verifyAccessToken, verifyRefreshToken, setAccessTokenCookie } from '@/utils';
import { ErrorCode, ResponseMessage, HttpStatus } from '@/constants';
import { errorResponse } from '@/modules/v1/shared';

export const userAuthMiddleware = (req: Request<unknown, unknown, unknown, AuthUserQueryType>, res: Response, next: NextFunction): void => {
  const accessToken: string = req.cookies.access_token;
  const refreshToken: string = req.cookies.refresh_token;

  if (!accessToken) {
    errorResponse<null>(res, HttpStatus.UNAUTHORIZED, null, ResponseMessage.UNAUTHORIZED, ErrorCode.UNAUTHORIZED);
    return;
  }

  try {
    const payload = verifyAccessToken(accessToken) as TokenPayload;
    req.user = payload;
    next();
  } catch {
    if (!refreshToken) {
      errorResponse<null>(res, HttpStatus.UNAUTHORIZED, null, ResponseMessage.UNAUTHORIZED, ErrorCode.UNAUTHORIZED);
      return;
    }

    try {
      const refreshPayload = verifyRefreshToken(refreshToken) as TokenPayload;

      const newAccessToken = createAccessToken(refreshPayload);
      setAccessTokenCookie(res, newAccessToken, req.query.local === 'true');

      req.user = refreshPayload;
      next();
    } catch {
      errorResponse<null>(res, 401, null, ResponseMessage.UNAUTHORIZED, ErrorCode.UNAUTHORIZED);
    }
  }
};

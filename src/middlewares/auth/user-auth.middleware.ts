import type { TokenPayload } from '@/types/common/basic.type';
import type { AuthUserQueryType } from '@/types/modules/v1/user/user-auth/query/user-query.type';
import type { Request, Response, NextFunction } from 'express';
import { createAccessToken, setAccessTokenCookie, verifyAccessToken, verifyRefreshToken } from '@/utils/auth/jwt.util';
import { errorResponse } from '@/modules/v1/shared/utils/error/api-response-handler.util';
import { ErrorCode } from '@/constants';
import { ResponseMessage } from '@/constants';
import { HttpStatus } from '@/constants';

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

import { Request, Response, NextFunction } from 'express';
import { createAccessToken, setAccessTokenCookie, verifyAccessToken, verifyRefreshToken } from '@/utils/auth/jwt.util';
import { errorResponse } from '@/utils/error/api-response-handler.util';
import { TokenPayload } from '@/types/common/basic.type';
import { ErrorCode } from '@/constants';
import { ResponseMessage } from '@/constants';
import { HttpStatus } from '@/constants';

const userAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

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
      setAccessTokenCookie(res, newAccessToken);

      req.user = refreshPayload;
      next();
    } catch {
      errorResponse<null>(res, 401, null, ResponseMessage.UNAUTHORIZED, ErrorCode.UNAUTHORIZED);
    }
  }
};

export { userAuthMiddleware };

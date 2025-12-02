import { Request, Response, NextFunction } from 'express';
import { createAccessToken, setAccessTokenCookie, verifyAccessToken, verifyRefreshToken } from '@/utils/auth-utils/jwt.util.js';
import { errorResponse } from '@/utils/error-utils/api-response-handler.util.js';
import { TokenPayload } from '@/types/basic-type/basic.type.js';
import { ErrorCode } from '@/constants/error-constants/ERROR_CODE.constant.js';
import { ResponseMessage } from '@/constants/error-constants/RESPONSE_MESSAGE.constant.js';

const userAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  if (!accessToken) {
    errorResponse<null>(res, 401, null, ResponseMessage.UNAUTH_MESSAGE, ErrorCode.FORBIDDEN);
    return;
  }

  try {
    const payload = verifyAccessToken(accessToken) as TokenPayload;
    req.user = payload;
    next();
  } catch {
    if (!refreshToken) {
      errorResponse<null>(res, 401, null, ResponseMessage.UNAUTH_MESSAGE, ErrorCode.FORBIDDEN);
      return;
    }

    try {
      const refreshPayload = verifyRefreshToken(refreshToken) as TokenPayload;

      const newAccessToken = createAccessToken(refreshPayload);
      setAccessTokenCookie(res, newAccessToken);

      req.user = refreshPayload;
      next();
    } catch {
      errorResponse<null>(res, 401, null, ResponseMessage.UNAUTH_MESSAGE, ErrorCode.FORBIDDEN);
    }
  }
};

export { userAuthMiddleware };

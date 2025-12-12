import { ENV } from '@/config';
import { HttpStatus, ResponseMessage } from '@/constants';
import { cookieOptionReturner } from '@/utils/auth/cookie-option.utils';
import { successResponse } from '@/utils/error/api-response-handler.util';
import { Request, Response, NextFunction } from 'express';

export const logoutUserController = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie('access_token', cookieOptionReturner(+ENV.ACCESS_TOKEN_EXPIRES_IN));
    res.clearCookie('refresh_token', cookieOptionReturner(+ENV.REFRESH_TOKEN_EXPIRES_IN));

    successResponse<null>(res, HttpStatus.OK, null, ResponseMessage.USER_LOGOUT);
  } catch (error: unknown) {
    next(error);
  }
};

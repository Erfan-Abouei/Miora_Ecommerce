import { HttpStatus, ResponseMessage } from '@/constants';
import { clearTokens } from '@/utils/auth/jwt.util';
import { successResponse } from '@/utils/error/api-response-handler.util';
import { Request, Response, NextFunction } from 'express';

export const logoutUserController = (req: Request, res: Response, next: NextFunction): void => {
  try {

    const isClearedToken = clearTokens(res)

    if (isClearedToken) successResponse<null>(res, HttpStatus.OK, null, ResponseMessage.USER_LOGOUT);
  } catch (error: unknown) {
    next(error);
  }
};

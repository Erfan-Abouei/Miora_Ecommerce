import { type AuthUserQueryType } from '@/types/modules/v1/user/user-auth/query/user-query.type';
import { HttpStatus, ResponseMessage } from '@/constants';
import { clearTokens } from '@/utils/auth/jwt.util';
import { successResponse } from '@/utils/error/api-response-handler.util';
import { Request, Response, NextFunction } from 'express';

export const logoutUserController = (req: Request<unknown, unknown, unknown, AuthUserQueryType>, res: Response, next: NextFunction): void => {
  try {

    const isClearedToken = clearTokens(res, !!req.query.local)

    if (isClearedToken) successResponse<{}>(res, HttpStatus.OK, {}, ResponseMessage.USER_LOGOUT);
  } catch (error: unknown) {
    next(error);
  }
};

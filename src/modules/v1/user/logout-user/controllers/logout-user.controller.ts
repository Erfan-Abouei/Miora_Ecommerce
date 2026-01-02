import type { Request, Response, NextFunction } from 'express';
import type { AuthUserQueryType } from '@/types/modules/v1/user/user-auth/query/user-query.type';
import { HttpStatus, ResponseMessage } from '@/constants';
import { clearTokens } from '@/utils/auth/jwt.util';
import { successResponse } from '@/modules/v1/shared/utils/error/api-response-handler.util';

export const logoutUserController = (req: Request<unknown, unknown, unknown, AuthUserQueryType>, res: Response, next: NextFunction): void => {
  try {
    const isClearedToken = clearTokens(res, req.query.local === 'true');

    if (isClearedToken) successResponse<null>(res, HttpStatus.NO_CONTENT, null, ResponseMessage.USER_LOGOUT);
  } catch (error: unknown) {
    next(error);
  }
};

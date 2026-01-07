import type { Request, Response, NextFunction } from 'express';
import type { AuthUserQueryType } from '@/types';
import { HttpStatus, ResponseMessage } from '@/constants';
import { clearTokens } from '@/utils';
import { successResponse } from '@/modules/v1/shared';

export const logoutUserController = (req: Request<unknown, unknown, unknown, AuthUserQueryType>, res: Response, next: NextFunction): void => {
  try {
    const isClearedToken = clearTokens(res, req.query.local === 'true');

    if (isClearedToken) successResponse<null>(res, HttpStatus.NO_CONTENT, null, ResponseMessage.USER_LOGOUT);
  } catch (error: unknown) {
    next(error);
  }
};

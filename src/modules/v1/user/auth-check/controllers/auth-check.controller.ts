import { Request, Response, NextFunction } from 'express';
import { successResponse } from '@/modules/v1/shared/utils/error/api-response-handler.util';
import { HttpStatus } from '@/constants';

export const authCheckController = (_: Request, res: Response, next: NextFunction): void => {
  try {
    successResponse<{}>(res, HttpStatus.NO_CONTENT, {});
  } catch (error: unknown) {
    next(error);
  }
};

import type { Request, Response, NextFunction } from 'express';
import { successResponse } from '@/modules/v1/shared';
import { HttpStatus } from '@/constants';

export const authCheckController = (_: Request, res: Response, next: NextFunction): void => {
  try {
    successResponse<null>(res, HttpStatus.OK, null);
  } catch (error: unknown) {
    next(error);
  }
};

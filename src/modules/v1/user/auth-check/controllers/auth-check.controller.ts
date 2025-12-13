import { Request, Response, NextFunction } from 'express';
import { successResponse } from '@/utils/error/api-response-handler.util';
import { HttpStatus } from '@/constants';

const authCheckController = (_: Request, res: Response, next: NextFunction): void => {
  try {
    successResponse<{}>(res, HttpStatus.OK, {});
  } catch (error: unknown) {
    next(error);
  }
};

export default authCheckController;

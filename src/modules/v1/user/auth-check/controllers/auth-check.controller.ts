import { Request, Response, NextFunction } from 'express';
import { successResponse } from '@/utils/error-utils/api-response-handler.util.js';

const authCheckController = (_: Request, res: Response, next: NextFunction): void => {
  try {
    successResponse<null>(res, 200);
  } catch (error) {
    next(error);
  }
};

export default authCheckController;

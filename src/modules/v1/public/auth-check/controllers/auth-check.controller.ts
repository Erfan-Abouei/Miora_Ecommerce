import { successResponse } from '@/utils/api-response-handler.utils.js';
import { Request, Response, NextFunction } from 'express';

const authCheckController = (req: Request, res: Response, next: NextFunction): void => {
  try {
    successResponse<{ login: boolean }>(res, 200, { login: true });
  } catch (error) {
    next(error);
  }
};

export default authCheckController;

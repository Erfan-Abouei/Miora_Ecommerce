import { ErrorCode } from '@/constants/error-constants/ERROR_CODE.constants.js';
import { errorResponse } from '@/utils/api-response-handler.utils.js';
import { Request, Response, NextFunction } from 'express';

export const routeNotFoundHandler = (req: Request, res: Response, next: NextFunction) =>
  errorResponse(res, 404, undefined, ErrorCode.NOT_FOUND, {
    404: `مسیر ${req.path} پیدا نشد`,
  });

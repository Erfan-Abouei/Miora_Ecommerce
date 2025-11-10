import { ZodType } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { ErrorCode } from '@/constants/error-constants/ERROR_CODE.constant.js';
import { errorResponse } from '@/utils/api-response-handler.util.js';

const validate = (schema: ZodType) => (req: Request, res: Response, next: NextFunction): void => {
  if (!req.body || Object.keys(req.body).length === 0) {
    errorResponse<null>(res, 400, null, 'هیچ داده‌ای برای ثبت ارسال نشده است.', ErrorCode.VALIDATION_ERROR);
    return;
  }
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export { validate };

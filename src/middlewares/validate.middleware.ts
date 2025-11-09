import { ZodType } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { ErrorCode } from '@/constants/error-constants/ERROR_CODE.constants.js';
import { errorResponse } from '@/utils/api-response-handler.utils.js';

const validate = (schema: ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      return errorResponse(res, 400, 'هیچ داده‌ای برای ثبت ارسال نشده است.', ErrorCode.VALIDATION_ERROR, { root: ['داده ورودی الزامی است.'] });
    }
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
};

export { validate };

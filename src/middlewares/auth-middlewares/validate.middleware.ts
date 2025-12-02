import { ZodType } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { ErrorCode } from '@/constants/error-constants/ERROR_CODE.constant.js';
import { errorResponse } from '@/utils/error-utils/api-response-handler.util.js';
import { ResponseMessage } from '@/constants/error-constants/RESPONSE_MESSAGE.constant.js';

const validate =
  (schema: ZodType) =>
  (req: Request, res: Response, next: NextFunction): void => {
    if (!req.body || Object.keys(req.body).length === 0) {
      errorResponse<null>(res, 400, null, ResponseMessage.NO_DATA_RECIVE_MESSAGE, ErrorCode.VALIDATION_ERROR);
      return;
    }
    try {
      schema.parse(req.body);
      next();
    } catch (error: unknown) {
      next(error);
    }
  };

export { validate };

import { ZodType } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { ErrorCode } from '@/constants/error/ERROR_CODE.constant';
import { errorResponse } from '@/utils/error/api-response-handler.util';
import { ResponseMessage } from '@/constants/error/RESPONSE_MESSAGE.constant';
import { HttpStatus } from '@/constants';

const validate =
  (schema: ZodType) =>
  (req: Request, res: Response, next: NextFunction): void => {
    if (!req.body || Object.keys(req.body).length === 0) {
      errorResponse<null>(res, HttpStatus.BAD_REQUEST, null, ResponseMessage.NO_DATA_RECEIVED, ErrorCode.NO_DATA_RECEIVED);
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

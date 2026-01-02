import type { ZodType } from 'zod';
import type { Request, Response, NextFunction } from 'express';
import { ErrorCode } from '@/constants';
import { errorResponse } from '@/modules/v1/shared/utils/error/api-response-handler.util';
import { ResponseMessage } from '@/constants';
import { HttpStatus } from '@/constants';

export const validate =
  (schema: ZodType) =>
    (req: Request, res: Response, next: NextFunction): void => {
      if ((req.body === null) || (req.body === undefined) || Object.keys(req.body as object).length === 0) {
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

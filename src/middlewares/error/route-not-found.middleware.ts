import type { NotFoundError } from '@/types';
import type { NextFunction, Request, Response } from 'express';
import { ErrorCode, ResponseMessage, HttpStatus } from '@/constants';
import { errorResponse } from '@/modules/v1/shared';

export const routeNotFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  errorResponse<NotFoundError>(res, HttpStatus.NOT_FOUND, { error_message: `.پیدا نشد ${req.method} با ${req.path} آدرس` }, ResponseMessage.NOT_FOUND, ErrorCode.NOT_FOUND);
  next();
};

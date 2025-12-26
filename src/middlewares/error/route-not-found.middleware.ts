import { type NotFoundError } from '@/types/error/not-fount-error.type';
import { NextFunction, Request, Response } from 'express';
import { ErrorCode } from '@/constants';
import { errorResponse } from '@/modules/v1/shared/utils/error/api-response-handler.util';
import { ResponseMessage } from '@/constants';
import { HttpStatus } from '@/constants';

export const routeNotFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  errorResponse<NotFoundError>(res, HttpStatus.NOT_FOUND, { error: `.پیدا نشد ${req.method} با ${req.path} آدرس` }, ResponseMessage.NOT_FOUND, ErrorCode.NOT_FOUND);
  next();
};

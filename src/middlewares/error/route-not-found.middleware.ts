import { type NotFoundError } from '@/types/error/not-fount-error.type';
import { NextFunction, Request, Response } from 'express';
import { ErrorCode } from '@/constants/error/ERROR_CODE.constant';
import { errorResponse } from '@/utils/error/api-response-handler.util';
import { ResponseMessage } from '@/constants/error/RESPONSE_MESSAGE.constant';
import { HttpStatus } from '@/constants';

const routeNotFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  errorResponse<NotFoundError>(res, HttpStatus.NOT_FOUND, { error: `.پیدا نشد ${req.method} با ${req.path} آدرس` }, ResponseMessage.NOT_FOUND, ErrorCode.NOT_FOUND);
  next();
};

export { routeNotFoundHandler };

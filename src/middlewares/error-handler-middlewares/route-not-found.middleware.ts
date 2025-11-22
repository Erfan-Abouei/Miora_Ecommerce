import { type NotFoundError } from '@/types/error-type/not-fount-error.type.js';
import { NextFunction, Request, Response } from 'express';
import { ErrorCode } from '@/constants/error-constants/ERROR_CODE.constant.js';
import { errorResponse } from '@/utils/error-utils/api-response-handler.util.js';
import { ErrorResponseMessage } from '@/constants/error-constants/ERROR_MESSAGE.constant.js';

const routeNotFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  errorResponse<NotFoundError>(
    res,
    404,
    { 404: `پیدا نشد ${req.method} با ${req.path} آدرس` },
    ErrorResponseMessage.UNKNOWN_MESSAGE,
    ErrorCode.NOT_FOUND,
  );
  next();
};

export { routeNotFoundHandler };

import { type ErrorsResponse } from '@/types/error/error-response.type';
import { ZodError } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { ErrorCode } from '@/constants/error/ERROR_CODE.constant';
import { ResponseMessage } from '@/constants/error/RESPONSE_MESSAGE.constant';
import { errorResponse } from '@/utils/error/api-response-handler.util';
import { zodIssuesToObject } from '@/utils/error/zod-issues-to-object.util';
import { appErrorToObject } from '@/utils/error/app-error-to-object.util';
import { AppError } from '@/types/common/basic.type';
import { HttpStatus } from '@/constants';

const isAppError = (err: unknown): err is AppError => typeof err === 'object' && err !== null && 'message' in err;

// for remove eslint unused _ error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction): void => {
  if (err instanceof ZodError) {
    errorResponse<ErrorsResponse>(res, HttpStatus.BAD_REQUEST, zodIssuesToObject(err.issues), ResponseMessage.VALIDATION_ERROR, ErrorCode.VALIDATION_ERROR);
    return;
  }

  if (isAppError(err)) {
    errorResponse(res, err.statusCode ?? 500, appErrorToObject(err), err.message as ResponseMessage, err.errorCode ?? ErrorCode.INTERNAL_SERVER_ERROR);
    return;
  }

  // Unknown Error
  errorResponse<null>(res, HttpStatus.INTERNAL_SERVER_ERROR, null, ResponseMessage.UNKNOWN_ERROR, ErrorCode.INTERNAL_SERVER_ERROR);
};

export { errorHandler };

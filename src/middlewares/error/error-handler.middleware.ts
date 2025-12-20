import { type ErrorsResponse } from '@/types/error/error-response.type';
import { ZodError } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { ErrorCode } from '@/constants';
import { ResponseMessage } from '@/constants';
import { errorResponse } from '@/utils/error/api-response-handler.util';
import { zodIssuesToObject } from '@/utils/error/zod-issues-to-object.util';
import { appErrorToObject } from '@/utils/error/app-error-to-object.util';
import { AppError } from '@/types/common/basic.type';
import { HttpStatus } from '@/constants';

const isAppError = (err: unknown): err is AppError => typeof err === 'object' && err !== null && 'message' in err;

// for remove eslint unused _ error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction): void => {
  if (err instanceof ZodError) {
    errorResponse<ErrorsResponse>(res, HttpStatus.BAD_REQUEST, zodIssuesToObject(err.issues), ResponseMessage.VALIDATION_ERROR, ErrorCode.VALIDATION_ERROR);
    return;
  }

  if (isAppError(err)) {
    errorResponse<ErrorsResponse>(res, err.statusCode ?? 500, appErrorToObject(err), err.message as ResponseMessage, err.errorCode ?? ErrorCode.INTERNAL_SERVER_ERROR);
    return;
  }

  // Unknown Error
  errorResponse<{}>(res, HttpStatus.INTERNAL_SERVER_ERROR, {}, ResponseMessage.UNKNOWN_ERROR, ErrorCode.INTERNAL_SERVER_ERROR);
};
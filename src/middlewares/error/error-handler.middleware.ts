import type { NextFunction, Request, Response } from 'express';
import type { AppError, ErrorsResponse } from '@/types';
import { ZodError } from 'zod';
import { ErrorCode, HttpStatus, ResponseMessage } from '@/constants';
import { appErrorToObject, errorResponse, zodIssuesToObject } from '@/modules/v1/shared';

const isAppError = (err: unknown): err is AppError => typeof err === 'object' && err !== null && 'message' in err;

// for remove eslint unused _ error

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
  errorResponse<null>(res, HttpStatus.INTERNAL_SERVER_ERROR, null, ResponseMessage.UNKNOWN_ERROR, ErrorCode.INTERNAL_SERVER_ERROR);
};

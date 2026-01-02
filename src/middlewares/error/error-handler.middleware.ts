import type { NextFunction, Request, Response } from 'express';
import type { AppError } from '@/types/common/basic.type';
import type { ErrorsResponse } from '@/types/error/error-response.type';
import { ZodError } from 'zod';
import { ErrorCode } from '@/constants';
import { ResponseMessage } from '@/constants';
import { errorResponse } from '@/modules/v1/shared/utils/error/api-response-handler.util';
import { zodIssuesToObject } from '@/modules/v1/shared/utils/error/zod-issues-to-object.util';
import { appErrorToObject } from '@/modules/v1/shared/utils/error/app-error-to-object.util';
import { HttpStatus } from '@/constants';

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

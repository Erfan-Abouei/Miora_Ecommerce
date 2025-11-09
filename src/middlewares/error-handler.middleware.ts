import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { ErrorCode } from '@/constants/error-constants/ERROR_CODE.constants.js';
import { AppError } from '@/types/basic-type/basic.types.js';
import { errorResponse } from '@/utils/api-response-handler.utils.js';
import { zodIssuesToObject } from '@/utils/zod-issues-to-object.utils.js';
import { appErrorToObject } from '@/utils/app-error-to-object.utils.js';

const isAppError = (err: unknown): err is AppError => {
  return typeof err === 'object' && err !== null && 'message' in err;
};

const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof ZodError) {
    errorResponse(res, 400, 'خطایی در اعتبارسنجی به وجود آمده است.', ErrorCode.VALIDATION_ERROR, zodIssuesToObject(err.issues));
    return;
  }

  if (isAppError(err)) {
    errorResponse(res, err.statusCode ?? 500, err.message, err.errorCode ?? ErrorCode.INTERNAL_SERVER_ERROR, appErrorToObject(err));
    return;
  }

  // Unknown Error
  errorResponse(res, 500, undefined, ErrorCode.UNKNOWN_ERROR, { error: [String(err) || 'خطای داخلی سرور'] });
};

export { errorHandler };

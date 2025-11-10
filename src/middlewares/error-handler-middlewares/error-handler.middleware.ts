import { type ErrorsResponse } from '@/types/error-type/error-response.type.js';
import { ZodError } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { ErrorCode } from '@/constants/error-constants/ERROR_CODE.constant.js';
import { ErrorResponseMessage } from '@/constants/error-constants/ERROR_MESSAGE.constant.js';
import { errorResponse } from '@/utils/api-response-handler.util.js';
import { zodIssuesToObject } from '@/utils/zod-issues-to-object.util.js';
import { appErrorToObject } from '@/utils/app-error-to-object.util.js';
import { AppError } from '@/types/basic-type/basic.type.js';

const isAppError = (err: unknown): err is AppError => typeof err === 'object' && err !== null && 'message' in err;

// for remove eslint unused _ error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction): void => {
  if (err instanceof ZodError) {
    errorResponse<ErrorsResponse>(
      res,
      400,
      zodIssuesToObject(err.issues),
      ErrorResponseMessage.VALIDATION_ERROR_MESSAGE,
      ErrorCode.VALIDATION_ERROR,
    );
    return;
  }

  if (isAppError(err)) {
    errorResponse(
      res,
      err.statusCode ?? 500,
      appErrorToObject(err),
      ErrorResponseMessage.UNKNOWN_MESSAGE,
      err.errorCode ?? ErrorCode.INTERNAL_SERVER_ERROR,
    );
    return;
  }

  // Unknown Error
  errorResponse<null>(res, 500, null, ErrorResponseMessage.UNKNOWN_MESSAGE, ErrorCode.UNKNOWN_ERROR);
};

export { errorHandler };

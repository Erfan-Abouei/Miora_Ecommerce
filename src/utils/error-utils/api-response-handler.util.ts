import type { Response } from 'express';
import type { ApiErrorResponse, ApiSuccessResponse } from '@/types/basic-type/response-utils.type.js';
import { ErrorCode } from '@/constants/error-constants/ERROR_CODE.constant.js';
import { ResponseMessage } from '@/constants/error-constants/RESPONSE_MESSAGE.constant.js';

const successResponse = <T>(res: Response<ApiSuccessResponse<T>>, status: number, data?: T, message = ResponseMessage.SUCCESS_MESSAGE, author = 'Kara Team'): Response<ApiSuccessResponse<T>> =>
  res.status(status).json({
    status,
    success: true,
    author,
    message,
    data: data ?? null,
  });

const errorResponse = <T>(res: Response<ApiErrorResponse<T>>, status: number, errors?: T, message = ResponseMessage.ERROR_MESSAGE, errorCode = ErrorCode.UNKNOWN_ERROR, author = 'Kara Team'): Response<ApiErrorResponse<T>> =>
  res.status(status).json({
    status,
    success: false,
    author,
    message,
    errorCode,
    errors: errors ?? null,
  });

export { successResponse, errorResponse };

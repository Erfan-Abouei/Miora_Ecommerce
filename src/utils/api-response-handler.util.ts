import type { Response } from 'express';
import type { ApiErrorResponse, ApiSuccessResponse } from '@/types/basic-type/response-utils.type.js';
import { ErrorCode } from '@/constants/error-constants/ERROR_CODE.constant.js';

const successResponse = <T>(
  res: Response<ApiSuccessResponse<T>>,
  status: number,
  data?: T,
  message = 'عملیات با موفقیت انجام شد.',
  author = 'Kara Team',
): Response<ApiSuccessResponse<T>> => res.status(status).json({
    success: true,
    status,
    author,
    message,
    data: data ?? null,
  });

const errorResponse = <T>(
  res: Response<ApiErrorResponse<T>>,
  status: number,
  errors?: T,
  message = 'مشکلی به وجود آمده است.',
  errorCode = ErrorCode.UNKNOWN_ERROR,
  author = 'Kara Team',
): Response<ApiErrorResponse<T>> => res.status(status).json({
    success: false,
    status,
    author,
    message,
    errorCode,
    errors: errors ?? null,
  });

export { successResponse, errorResponse };

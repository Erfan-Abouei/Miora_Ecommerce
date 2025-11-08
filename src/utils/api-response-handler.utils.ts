import type { Response } from 'express';
import type { ApiErrorResponse, ApiSuccessResponse } from '@/types/basic-type/basic.types.js';
import { ErrorCode } from '@/constants/error-constants/ERROR_CODE.constants.js';

export const successResponse = <T>(res: Response<ApiSuccessResponse<T>>, status: number, data?: T, message = 'عملیات با موفقیت انجام شد.', author = 'Kara Team'): Response<ApiSuccessResponse<T>> => {
  return res.status(status).json({
    success: true,
    status,
    author,
    message,
    data: data ?? null,
  });
};

export const errorResponse = <T>(res: Response<ApiErrorResponse<T>>, status: number, message = 'مشکلی به وجود آمده است.', errorCode = ErrorCode.UNKNOWN_ERROR, errors?: T, author = 'Kara Team'): Response<ApiErrorResponse<T>> => {
  return res.status(status).json({
    success: false,
    status,
    author,
    message,
    errorCode,
    errors: errors ?? null,
  });
};

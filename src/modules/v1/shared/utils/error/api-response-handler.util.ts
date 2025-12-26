import { Response } from 'express';
import { ApiErrorResponse, ApiSuccessResponse } from '@/types/common/response-utils.type';
import { ErrorCode } from '@/constants';
import { ResponseMessage } from '@/constants';
import { ENV } from '@/config';

export const successResponse = <T>(res: Response<ApiSuccessResponse<T>>, status: number, data?: T, message = ResponseMessage.SUCCESS, author = ENV.AUTHOR): Response<ApiSuccessResponse<T>> =>
  res.status(status).json({
    status,
    success: true,
    author,
    message,
    data: data ?? {},
    time_zone: ENV.TIMEZONE,
    version: ENV.APP_VERSION,
  });

export const errorResponse = <T>(res: Response<ApiErrorResponse<T>>, status: number, errors?: T, message = ResponseMessage.ERROR, error_code = ErrorCode.UNKNOWN_ERROR, author = ENV.AUTHOR): Response<ApiErrorResponse<T>> =>
  res.status(status).json({
    status,
    success: false,
    author,
    message,
    error_code,
    errors: errors ?? {},
    time_zone: ENV.TIMEZONE,
    version: ENV.APP_VERSION,
  });

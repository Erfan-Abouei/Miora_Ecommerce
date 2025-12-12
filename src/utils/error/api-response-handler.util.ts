import { Response } from 'express';
import { ApiErrorResponse, ApiSuccessResponse } from '@/types/common/response-utils.type';
import { ErrorCode } from '@/constants/error/ERROR_CODE.constant';
import { ResponseMessage } from '@/constants/error/RESPONSE_MESSAGE.constant';
import { ENV } from '@/config';

const successResponse = <T>(res: Response<ApiSuccessResponse<T>>, status: number, data?: T, message = ResponseMessage.SUCCESS, author = ENV.AUTHOR): Response<ApiSuccessResponse<T>> =>
  res.status(status).json({
    status,
    success: true,
    author,
    message,
    data: data ?? null,
    version: ENV.APP_VERSION,
  });

const errorResponse = <T>(res: Response<ApiErrorResponse<T>>, status: number, errors?: T, message = ResponseMessage.ERROR, errorCode = ErrorCode.UNKNOWN_ERROR, author = ENV.AUTHOR): Response<ApiErrorResponse<T>> =>
  res.status(status).json({
    status,
    success: false,
    author,
    message,
    errorCode,
    errors: errors ?? null,
    version: ENV.APP_VERSION,
  });

export { successResponse, errorResponse };

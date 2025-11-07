import { ErrorCode } from '@/constants/error-constants/ERROR_CODE.constants.js';
import { Response } from 'express';

/**
 * Send a standardized success response
 * @template T - Type of the response data
 * @param res - Express Response object
 * @param status - HTTP status code
 * @param data - Optional payload data
 * @param message - Optional message (default: "Operation successful")
 * @param author - Optional author/team name (default: "Kara Team")
 */
export const successResponse = <T>(res: Response, status: number, data?: T, message: string = 'عملیات با موفقیت انجام شد.', author: string = 'Kara Team') => {
  res.status(status).json({
    success: true,
    status,
    author,
    message,
    data: data ?? null,
  });
};

/**
 * Send a standardized error response
 * @template T - Type of the error details (e.g., validation errors)
 * @param res - Express Response object
 * @param status - HTTP status code
 * @param message - Optional error message (default: "An error occurred")
 * @param errorCode - Optional error code from enum (default: UNKNOWN_ERROR)
 * @param errors - Optional detailed error object (e.g., validation errors)
 * @param author - Optional author/team name (default: "Kara Team")
 */
export const errorResponse = <T>(res: Response, status: number, message: string = 'مشکلی به وجود آمده است.', errorCode: string = ErrorCode.UNKNOWN_ERROR, errors?: T, author: string = 'Kara Team') => {
  res.status(status).json({
    success: false,
    status,
    author,
    message,
    errors: errors ?? null,
    errorCode,
  });
};

import { ErrorCode } from '@/constants/error-constants/ERROR_CODE.constant.js';

export type ApiSuccessResponse<T> = {
  success: true;
  status: number;
  author: string;
  message: string;
  data: T | null;
};

export type ApiErrorResponse<T> = {
  success: false;
  status: number;
  author: string;
  message: string;
  errorCode: ErrorCode;
  errors: T | null;
};

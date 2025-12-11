import { ErrorCode } from '@/constants/error/ERROR_CODE.constant';

export interface ApiSuccessResponse<T> {
  success: true;
  status: number;
  author: string;
  message: string;
  data: T | null;
}

export interface ApiErrorResponse<T> {
  success: false;
  status: number;
  author: string;
  message: string;
  errorCode: ErrorCode;
  errors: T | null;
}

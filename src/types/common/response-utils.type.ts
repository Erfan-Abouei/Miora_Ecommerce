import { ErrorCode } from '@/constants';

export interface ApiSuccessResponse<T> {
  success: true;
  status: number;
  author: string;
  message: string;
  data: T | {};
  version: string;
}

export interface ApiErrorResponse<T> {
  success: false;
  status: number;
  author: string;
  message: string;
  errorCode: ErrorCode;
  errors: T | {};
  version: string;
}

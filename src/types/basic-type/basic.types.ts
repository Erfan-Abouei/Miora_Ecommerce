import { ErrorCode } from "@/constants/error-constants/ERROR_CODE.constants.js";

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
  errorCode: string;
  errors: T | null;
};

export interface AppError extends Error {
  statusCode?: number;
  errorCode?: ErrorCode;
  details?: any;
}

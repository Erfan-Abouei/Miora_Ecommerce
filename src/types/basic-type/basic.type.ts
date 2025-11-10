import { ErrorCode } from '@/constants/error-constants/ERROR_CODE.constant.js';

export interface AppError extends Error {
  statusCode?: number;
  errorCode?: ErrorCode;
  details?: unknown;
}

export interface TokenPayload {
  userId: string;
  role: string;
}

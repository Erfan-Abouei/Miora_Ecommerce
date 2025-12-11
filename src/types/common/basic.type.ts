import { ErrorCode } from '@/constants/error/ERROR_CODE.constant';

export interface AppError extends Error {
  statusCode?: number;
  errorCode?: ErrorCode;
  details?: unknown;
}

export interface TokenPayload {
  userId: string;
  role: string;
}

import { ErrorCode } from '@/constants/error-constants/ERROR_CODE.constant.js';

export type ErrorsResponse = Record<string, string[]>;
export interface CustomErrorProps {
  message?: string;
  statusCode?: number;
  errorCode?: ErrorCode;
  details?: ErrorsResponse;
}

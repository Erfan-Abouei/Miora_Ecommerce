import { ErrorCode } from '@/constants/error/ERROR_CODE.constant';

export type ErrorsResponse = Record<string, string[]>;
export interface CustomErrorProps {
  message?: string;
  statusCode?: number;
  errorCode?: ErrorCode;
  details?: ErrorsResponse;
}

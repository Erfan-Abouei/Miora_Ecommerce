import type { ErrorCode } from '@/constants';

export type ErrorsResponse = Record<string, string[]>;
export interface CustomErrorProps {
  message?: string;
  statusCode?: number;
  errorCode?: ErrorCode;
  details?: ErrorsResponse;
}

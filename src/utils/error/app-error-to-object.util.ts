import type { AppError } from '@/types/common/basic.type';
import type { ErrorsResponse } from '@/types/error/error-response.type';
import { ResponseMessage } from '@/constants';

export const appErrorToObject = (err: AppError | string): ErrorsResponse => {
  if (typeof err === 'string') return { error_message: [err] };

  if (err.details && typeof err.details === 'object' && !Array.isArray(err.details)) {
    const details = err.details as Record<string, unknown>;
    const result: ErrorsResponse = {};
    Object.keys(details).forEach((key) => {
      const value = details[key];
      result[key] = Array.isArray(value) ? value.map(String) : [String(value)];
    });
    return result;
  }

  return { error_message: [err.message ?? ResponseMessage.ERROR] };
};

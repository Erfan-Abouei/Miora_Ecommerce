import type { AppError, ErrorsResponse } from '@/types';
import { ResponseMessage } from '@/constants';

export const appErrorToObject = (err: AppError | string): ErrorsResponse => {
  if (typeof err === 'string') return { error_message: [err] };

  if ((err.details !== undefined || err.details !== null) && typeof err.details === 'object' && !Array.isArray(err.details)) {
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

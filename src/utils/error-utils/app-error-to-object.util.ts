import type { AppError } from '@/types/basic-type/basic.type.js';
import type { ErrorsResponse } from '@/types/error-type/error-response.type.js';

const appErrorToObject = (err: AppError | string): ErrorsResponse => {
  if (typeof err === 'string') return { error: [err] };

  if (err.details && typeof err.details === 'object' && !Array.isArray(err.details)) {
    const details = err.details as Record<string, unknown>;
    const result: ErrorsResponse = {};
    Object.keys(details).forEach((key) => {
      const value = details[key];
      result[key] = Array.isArray(value) ? value.map(String) : [String(value)];
    });
    return result;
  }

  return { error: [err.message ?? 'خطایی به وجود آمده است.'] };
};

export { appErrorToObject };

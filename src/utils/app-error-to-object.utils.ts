import { AppError } from '@/types/basic-type/basic.types.js';

const appErrorToObject = (err: AppError | string): Record<string, string[]> => {
  if (typeof err === 'string') return { error: [err] };
  if (typeof err.details === 'object' && err.details !== null) {
    const result: Record<string, string[]> = {};
    for (const key in err.details) {
      const value = err.details[key];
      result[key] = Array.isArray(value) ? value : [String(value)];
    }
    return result;
  }
  return { error: [err.message ?? 'خطایی به وجود آمده است.'] };
};

export { appErrorToObject };

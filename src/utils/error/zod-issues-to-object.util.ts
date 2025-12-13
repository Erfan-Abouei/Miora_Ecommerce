import { type ErrorsResponse } from '@/types/error/error-response.type';
import { type ZodError } from 'zod';

export const zodIssuesToObject = (issues: ZodError['issues']): ErrorsResponse => {
  const result: ErrorsResponse = {};
  issues.forEach((issue) => {
    const path = issue.path.join('.') || 'root';
    if (!result[path]) result[path] = [];
    result[path].push(issue.message);
  });
  return result;
};


import { type ZodError } from 'zod';

const zodIssuesToObject = (issues: ZodError['issues']): Record<string, string[]> => {
  const result: Record<string, string[]> = {};
  issues.forEach((issue) => {
    const path = issue.path.join('.') || 'root';
    if (!result[path]) result[path] = [];
    result[path].push(issue.message);
  });
  return result;
};

export { zodIssuesToObject };

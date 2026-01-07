import type { CacheKey } from '@/constants';

export const cacheNameBuilder = (prefix: CacheKey, identifier: string | number): string => {
  return `${prefix}:${identifier}`;
};

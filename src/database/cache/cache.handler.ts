import cache from '@/database/cache/cache.config';
import { ENV } from '@/config';

export const cacheSet = async <T>(key: string, value: T, ttl: number = 100): Promise<boolean> => {
  const success = cache.set(key, value, ttl);
  return success;
};

export const cacheGet = async <T>(key: string): Promise<T | null> => {
  const data = cache.get<T>(key);
  return data ?? null;
};

export const cacheHas = async (key: string): Promise<boolean> => {
  const exists = cache.has(key);
  return exists;
};

export const cacheDel = async (keys: string | string[]): Promise<number> => {
  const normalizedKeys = Array.isArray(keys) ? keys : [keys];
  const deleted = normalizedKeys.reduce((acc, key) => {
    const success = cache.del(key);
    return success ? acc + 1 : acc;
  }, 0);
  return deleted;
};

export const cacheTtl = async (key: string): Promise<number | null> => {
  const expirationTime = cache.getTtl(key) ?? 0;
  const currentTime = Date.now();

  const ttl = Math.max(0, Math.floor((expirationTime - currentTime) / 1000));

  return ttl
};


export const cacheFlush = async (): Promise<void> => {
  cache.flushAll();
};
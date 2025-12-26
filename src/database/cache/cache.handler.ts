import client from '@/database/cache/cache.config';
import { ENV } from '@/config';

export const cacheSet = async <T>(key: string, value: T, ttl: number = ENV.CACHE_TTL): Promise<boolean> => {
  const result = await client.set(key, JSON.stringify(value), { EX: ttl });
  return result === 'OK';
};

export const cacheGet = async <T>(key: string): Promise<T | null> => {
  const data = await client.get(key);
  return data ? (JSON.parse(data) as T) : null;
};

export const cacheHas = async (key: string): Promise<boolean> => {
  return (await client.exists(key)) === 1;
};

export const cacheDel = async (keys: string | string[]): Promise<number> => {
  const normalizedKey = Array.isArray(keys) ? keys : [keys];
  return Array.isArray(keys) ? client.del(normalizedKey) : client.del(keys);
};

export const cacheTtl = async (key: string): Promise<number | null> => {
  // -2 ==> key not found
  // -1 ==> expired ttl
  const ttl = await client.ttl(key);
  return ttl === -2 ? null : ttl;
};

export const cacheFlush = async (): Promise<void> => {
  await client.flushDb();
};

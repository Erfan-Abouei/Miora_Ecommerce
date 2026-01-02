import { CacheKey } from "@/constants/cache-key/CACHE_KEY.constant";

export const cacheNameBuilder = (prefix: CacheKey, identifier: string | number): string => {
    return `${prefix}:${identifier}`
}
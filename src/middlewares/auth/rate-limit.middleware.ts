import { CacheKey, ErrorCode, HttpStatus, ResponseMessage } from "@/constants"
import { cacheGet, cacheSet, cacheTtl } from "@/database/cache/cache.handler"
import { errorResponse } from "@/modules/v1/shared/utils/error/api-response-handler.util"
import { RateLimitErrorResponse } from "@/types/error/rate-limit-error.type"
import { cacheNameBuilder } from "@/utils/cache/cache-name-builder"
import { Request, Response, NextFunction } from "express"

export const rateLimitMiddleWare = (maxRequest: number, blockDuration: number) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        const ipAddress = req.ip as string
        const fullRouteUrl = req.originalUrl.split('?')[0]
        const attemptKey = cacheNameBuilder(CacheKey.RATE_LIMIT, `${ipAddress}:${fullRouteUrl}`)

        const attempt: number = await cacheGet(attemptKey) ?? 0
        if (attempt >= maxRequest) {
            const attemptTtl: number = await cacheTtl(attemptKey) as number

            const errors: RateLimitErrorResponse = {
                route: fullRouteUrl,
                retry_after: attemptTtl,
                route_max_request: maxRequest,
                route_block_duration: blockDuration + 's'
            }
            errorResponse<RateLimitErrorResponse>(res, HttpStatus.TOO_MANY_REQUESTS, errors, ResponseMessage.TOO_MANY_REQUESTS, ErrorCode.TOO_MANY_REQUESTS)
            return;
        }
        if (attempt === 0) {
            await cacheSet(attemptKey, attempt + 1, blockDuration)
        }
        else {
            await cacheSet(attemptKey, attempt + 1)
        }
        next()
    }
}
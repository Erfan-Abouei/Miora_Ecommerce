export interface RateLimitErrorResponse {
    route: string;
    retry_after: number;
    route_max_request: number
    route_block_duration: string
}
import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';
import { errorResponse } from '@/utils/error/api-response-handler.util';
import { ErrorCode } from '@/constants/error/ERROR_CODE.constant';
import { ResponseMessage } from '@/constants/error/RESPONSE_MESSAGE.constant';
import { ENV } from '../env/env.config';
import { HttpStatus } from '@/constants';

export const apiLimiter = rateLimit({
  windowMs: ENV.API_RATE_LIMIT_WINDOW,
  max: ENV.API_RATE_LIMIT_MAX,

  legacyHeaders: true,
  handler: (_: Request, res: Response) => {
    errorResponse<null>(res, HttpStatus.TOO_MANY_REQUESTS, null, ResponseMessage.TOO_MANY_REQUESTS, ErrorCode.TOO_MANY_REQUESTS);
  },
});

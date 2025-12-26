import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';
import { errorResponse } from '@/modules/v1/shared/utils/error/api-response-handler.util';
import { ErrorCode } from '@/constants';
import { ResponseMessage } from '@/constants';
import { ENV } from '../index';
import { HttpStatus } from '@/constants';

export const apiLimiter = rateLimit({
  windowMs: ENV.API_RATE_LIMIT_WINDOW,
  max: ENV.API_RATE_LIMIT_MAX,

  legacyHeaders: true,
  handler: (_: Request, res: Response) => {
    errorResponse<{}>(res, HttpStatus.TOO_MANY_REQUESTS, {}, ResponseMessage.TOO_MANY_REQUESTS, ErrorCode.TOO_MANY_REQUESTS);
  },
});

import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';
import { errorResponse } from '@/utils/error-utils/api-response-handler.util.js';
import { ErrorCode } from '@/constants/error-constants/ERROR_CODE.constant.js';
import { ErrorResponseMessage } from '@/constants/error-constants/ERROR_MESSAGE.constant.js';

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_: Request, res: Response) => {
    errorResponse<null>(res, 429, null, ErrorResponseMessage.TO_MANY_REQUEST_MESSAGE, ErrorCode.UNKNOWN_ERROR);
  },
});

export { apiLimiter };

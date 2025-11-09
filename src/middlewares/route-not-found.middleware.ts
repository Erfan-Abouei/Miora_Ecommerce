import { ErrorCode } from '@/constants/error-constants/ERROR_CODE.constants.js';
import { errorResponse } from '@/utils/api-response-handler.utils.js';
import { Request, Response } from 'express';

const routeNotFoundHandler = (req: Request, res: Response): Response =>
  errorResponse(res, 404, undefined, ErrorCode.NOT_FOUND, {
    404: `پیدا نشد ${req.path}`,
  });

export { routeNotFoundHandler };

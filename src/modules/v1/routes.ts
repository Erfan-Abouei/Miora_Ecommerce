import { Router, Request, Response } from 'express';
import { successResponse } from '@/utils/api-response-handler.utils.js';
import { healthCheckRouter } from './health-check/index.js';

const v1Routes = Router();

// for test (entry point)
v1Routes.get('/', (_: Request, res: Response) => successResponse<{ pour_ghasemi: string }>(res, 200, { pour_ghasemi: 'ساخته شده با عشق برای عشق ❤️' }));

// check server health and check connection
v1Routes.use(healthCheckRouter);
export default v1Routes;

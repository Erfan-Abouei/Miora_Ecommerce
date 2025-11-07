import { Router, Request, Response } from 'express';
import { successResponse } from '@/utils/api-response-handler.utils.js';

const v1Routes = Router();

v1Routes.get('/', (req: Request, res: Response) => successResponse(res, 200, { pour_ghasemi: 'ساخته شده با عشق برای عشق ❤️' }));

export default v1Routes;

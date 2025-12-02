import { type GetHealthCheckQuery } from '@/types/query-type/get-health-check-query.type.js';
import { NextFunction, Request, Response } from 'express';
import { successResponse } from '@/utils/error-utils/api-response-handler.util.js';
import { HealthCheckData } from '@/types/data-type/health-check-data.type.js';
import { getHealthCheckDataService } from '../services/index.js';

const getHealthCheckDataController = async (req: Request<unknown, unknown, unknown, GetHealthCheckQuery>, res: Response, next: NextFunction): Promise<void> => {
  try {
    let healthCheckData: HealthCheckData | null = null;
    const withSystemData = req.query.has_system_data;
    if (withSystemData === 'true') healthCheckData = await getHealthCheckDataService();
    successResponse<null | HealthCheckData>(res, 200, healthCheckData);
  } catch (error: unknown) {
    next(error);
  }
};

export { getHealthCheckDataController };

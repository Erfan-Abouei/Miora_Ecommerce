import { type GetHealthCheckQuery } from '@/types/query-type/get-health-check-query.types.js';
import { NextFunction, Request, Response } from 'express';
import { successResponse } from '@/utils/api-response-handler.utils.js';
import { getHealthCheckDataService } from '../services/index.js';
import { HealthCheckData } from '@/types/data-type/health-check-data.types.js';
import { logger } from '@/config/logger.config.js';

const getHealthCheckDataController = async (req: Request<{}, {}, {}, GetHealthCheckQuery>, res: Response, next: NextFunction): Promise<void> => {
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

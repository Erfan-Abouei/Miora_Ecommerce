import { type HealthCheckQueryType } from '@/types/modules/v1/health-check/query/health-check-query.type';
import { NextFunction, Request, Response } from 'express';
import { successResponse } from '@/utils/error/api-response-handler.util';
import { HealthCheckData } from '@/types/modules/v1/health-check/data/health-check-data.type';
import { getHealthCheckDataService } from '../services/index';
import { HttpStatus } from '@/constants';

export const getHealthCheckDataController = async (req: Request<unknown, unknown, unknown, HealthCheckQueryType>, res: Response, next: NextFunction): Promise<void> => {
  try {
    let healthCheckData: HealthCheckData | null = null;
    const withSystemData = req.query.has_system_data;
    if (withSystemData === 'true') healthCheckData = await getHealthCheckDataService();
    successResponse<null | HealthCheckData>(res, HttpStatus.OK, healthCheckData);
  } catch (error: unknown) {
    next(error);
  }
};

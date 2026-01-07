import type { HealthCheckQueryType, HealthCheckData } from '@/types';
import type { NextFunction, Request, Response } from 'express';
import { successResponse } from '@/modules/v1/shared';
import { getHealthCheckDataService } from '../services';
import { HttpStatus } from '@/constants';

export const getHealthCheckDataController = async (req: Request<unknown, unknown, unknown, HealthCheckQueryType>, res: Response, next: NextFunction): Promise<void> => {
  try {
    let healthCheckData: HealthCheckData | null = null;
    const withSystemData = req.query.has_system_data;
    if (withSystemData === 'true') healthCheckData = await getHealthCheckDataService();
    successResponse<null | HealthCheckData>(res, HttpStatus.NO_CONTENT, healthCheckData ?? null);
  } catch (error: unknown) {
    next(error);
  }
};

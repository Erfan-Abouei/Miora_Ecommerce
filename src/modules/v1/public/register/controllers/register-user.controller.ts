import type { RegisterUserDTO, RegisterUserServerDTO } from '@/types';
import type { Request, Response, NextFunction } from 'express';
import { successResponse } from '@/modules/v1/shared';
import { registerUserService } from '../services';
import { HttpStatus } from '@/constants';

export const registerUserController = async (req: Request<unknown, unknown, RegisterUserDTO>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await registerUserService(req.body);
    successResponse<RegisterUserServerDTO>(res, HttpStatus.OK, result);
  } catch (error: unknown) {
    next(error);
  }
};

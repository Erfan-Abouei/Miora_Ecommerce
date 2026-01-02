import type { RegisterUserDTO, RegisterUserServerDTO } from '@/types/modules/v1/user/user-auth/dto/user-dto.type';
import type { Request, Response, NextFunction } from 'express';
import { successResponse } from '@/modules/v1/shared/utils/error/api-response-handler.util';
import { registerUserService } from '../services';
import { HttpStatus } from '@/constants';

export const registerUserController = async (req: Request<unknown, unknown, RegisterUserDTO>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const aboutRegisterAndOtpData = await registerUserService(req.body);
    successResponse<RegisterUserServerDTO>(res, HttpStatus.OK, aboutRegisterAndOtpData);
  } catch (error: unknown) {
    next(error);
  }
};

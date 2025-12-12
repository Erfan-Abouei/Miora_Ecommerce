import { Request, Response, NextFunction } from 'express';
import { successResponse } from '@/utils/error/api-response-handler.util';
import { registerUserService } from '../services';
import { RegisterUserDTO, RegisterUserServerDTO } from '@/types/modules/v1/user/dto/user-dto.type';
import { HttpStatus } from '@/constants';

export const registerUserController = async (req: Request<unknown, unknown, RegisterUserDTO>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const aboutRegisterAndOtpData = await registerUserService(req.body);
    if (aboutRegisterAndOtpData) {
      successResponse<RegisterUserServerDTO>(res, HttpStatus.OK, aboutRegisterAndOtpData);
    }
  } catch (error: unknown) {
    next(error);
  }
};

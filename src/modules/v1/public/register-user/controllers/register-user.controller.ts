import { Request, Response, NextFunction } from 'express';
import { successResponse } from '@/utils/error-utils/api-response-handler.util.js';
import { registerUserService } from '../services/index.js';
import { RegisterUserDto, RegisterUserServerDto } from '../interfaces/register-user.interface.js';

export const registerUserController = async (req: Request<unknown, unknown, RegisterUserDto>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const aboutRegisterAndOtpData = await registerUserService(req.body);
    if (aboutRegisterAndOtpData) {
      successResponse<RegisterUserServerDto>(res, 200, aboutRegisterAndOtpData, 'عملیات با موفقیت انجام شد و کد تایید ارسال شد.');
    }
  } catch (error: unknown) {
    next(error);
  }
};

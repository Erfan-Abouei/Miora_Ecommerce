import type { Request, Response, NextFunction } from 'express';
import type { RegisterUserResendOtpDTO, RegisterUserResendOtpServerDTO } from '@/types/modules/v1/user/user-auth/dto/user-dto.type';
import { registerUserResendOtpService } from '../services';
import { successResponse } from '@/modules/v1/shared/utils/error/api-response-handler.util';
import { HttpStatus } from '@/constants';

export const registerUserResendOtpController = async (req: Request<unknown, unknown, RegisterUserResendOtpDTO>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const aboutOtpData = await registerUserResendOtpService({ phone_number: req.body.phone_number });
    successResponse<RegisterUserResendOtpServerDTO>(res, HttpStatus.OK, aboutOtpData);
  } catch (error: unknown) {
    next(error);
  }
};

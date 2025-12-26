import { Request, Response, NextFunction } from 'express';
import { RegisterUserResendOtpDTO, RegisterUserResendOtpServerDTO, RegisterUserServerDTO } from '@/types/modules/v1/user/user-auth/dto/user-dto.type';
import { registerUserResendOtpService } from '../services';
import { successResponse } from '@/modules/v1/shared/utils/error/api-response-handler.util';
import { HttpStatus } from '@/constants';

export const registerUserResendOtpController = async (req: Request<unknown, unknown, RegisterUserResendOtpDTO>, res: Response, next: NextFunction) => {
  try {
    const aboutOtpData = (await registerUserResendOtpService(req.body)) as RegisterUserResendOtpServerDTO;
    if (aboutOtpData) {
      successResponse<RegisterUserResendOtpServerDTO>(res, HttpStatus.OK, aboutOtpData);
    }
  } catch (error: unknown) {
    next(error);
  }
};

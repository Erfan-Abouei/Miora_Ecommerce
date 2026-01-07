import type { Request, Response, NextFunction } from 'express';
import type { RegisterUserResendOtpDTO, RegisterUserResendOtpServerDTO } from '@/types';
import { registerUserResendOtpService } from '../services';
import { successResponse } from '@/modules/v1/shared';
import { HttpStatus } from '@/constants';

export const registerUserResendOtpController = async (req: Request<unknown, unknown, RegisterUserResendOtpDTO>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const aboutOtpData = await registerUserResendOtpService({ register_session_id: req.body.register_session_id });
    successResponse<RegisterUserResendOtpServerDTO>(res, HttpStatus.OK, aboutOtpData);
  } catch (error: unknown) {
    next(error);
  }
};

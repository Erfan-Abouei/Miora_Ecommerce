import { ForgotPasswordRequestedDTO } from '@/types/modules/v1/user/user-auth/dto/user-dto.type';
import { Request, Response, NextFunction } from 'express';
import { forgotPasswordRequestedService } from '../services';

export const forgotPasswordRequestedController = async (req: Request<unknown, unknown, ForgotPasswordRequestedDTO>, res: Response, next: NextFunction) => {
  try {
    const aboutForgetPasswordData = await forgotPasswordRequestedService(req.body)
  } catch (error: unknown) {
    next(error);
  }
};

import { Request, Response, NextFunction } from 'express';
import { registerUserService } from '../services/register-user.service.js';
import { CreateUserDto } from '../interfaces/register-user.interface.js';
import { successResponse } from '@/utils/api-response-handler.utils.js';

export const registerUserController = async (req: Request<{}, {}, CreateUserDto>, res: Response, next: NextFunction) => {
  try {
    const user = await registerUserService(req.body);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      successResponse(res, 201, userWithoutPassword, 'عملیات ثبت نام با موفقیت انجام شد.');
      return;
    }
  } catch (error) {
    next(error);
  }
};

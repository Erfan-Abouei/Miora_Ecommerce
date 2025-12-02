import { Request, Response, NextFunction } from 'express';
import { User } from '@prisma/client';
import { LoginUserDTO } from '../interfaces/login-user.interface.js';
import { loginUserRegister } from '../services/login-user.service.js';
import { successResponse } from '@/utils/error-utils/api-response-handler.util.js';

export const loginUserController = async (req: Request<unknown, unknown, LoginUserDTO>, res: Response, next: NextFunction) => {
  try {
    const createdUserData = await loginUserRegister(req.body);
    if (createdUserData) {
      successResponse<Omit<User, 'id' | 'role' | 'password'>>(res, 200, createdUserData);
      return;
    }
  } catch (error: unknown) {
    next(error);
  }
};

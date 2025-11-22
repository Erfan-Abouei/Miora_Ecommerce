import { type UserData } from '@/types/data-type/user-data.type.js';
import { Request, Response, NextFunction } from 'express';
import { successResponse } from '@/utils/error-utils/api-response-handler.util.js';
import { setTokens } from '@/utils/auth-utils/jwt.util.js';
import { TokenPayload } from '@/types/basic-type/basic.type.js';
import { registerUserConfrimService } from '../services/index.js';
import { RegisterUserConfirmDto } from '../interfaces/register-user-confirm.interface.js';

export const registerUserConfrimController = async (
  req: Request<unknown, unknown, RegisterUserConfirmDto>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await registerUserConfrimService(req.body);
    if (user) {
      const { password, role, id, ...userWithoutPassword } = user;
      const tokenPayload: TokenPayload = {
        userId: user.id,
        role,
      };
      setTokens(res, tokenPayload);
      successResponse<Omit<UserData, 'password' | 'role' | 'id'>>(res, 201, userWithoutPassword, 'عملیات ثبت نام با موفقیت انجام شد.');
    }
  } catch (error) {
    next(error);
  }
};

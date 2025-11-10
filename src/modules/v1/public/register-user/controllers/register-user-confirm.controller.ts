import { type UserData } from '@/types/data-type/user-data.type.js';
import { Request, Response, NextFunction } from 'express';
import { successResponse } from '@/utils/api-response-handler.util.js';
import { setTokens } from '@/utils/jwt.util.js';
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
      // for remove eslint unused _ error
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithoutPassword } = user;
      const tokenPayload: TokenPayload = {
        userId: user.id,
        role: user.role,
      };
      setTokens(res, tokenPayload);
      successResponse<Omit<UserData, 'password'>>(res, 201, userWithoutPassword, 'عملیات ثبت نام با موفقیت انجام شد.');
    }
  } catch (error) {
    next(error);
  }
};

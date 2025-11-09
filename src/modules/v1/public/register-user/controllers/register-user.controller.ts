import { Request, Response, NextFunction } from 'express';
import { registerUserService } from '../services/register-user.service.js';
import { CreateUserDto } from '../interfaces/register-user.interface.js';
import { successResponse } from '@/utils/api-response-handler.utils.js';
import { setTokens } from '@/utils/jwt.utils.js';
import { TokenPayload } from '@/types/basic-type/basic.types.js';

export const registerUserController = async (req: Request<{}, {}, CreateUserDto>, res: Response, next: NextFunction) => {
  try {
    const user = await registerUserService(req.body);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      const tokenPayload: TokenPayload = {
        userId: user.id,
        role: user.role,
      };
      setTokens(res, tokenPayload);
      successResponse(res, 201, userWithoutPassword, 'عملیات ثبت نام با موفقیت انجام شد.');
    }
  } catch (error) {
    next(error);
  }
};

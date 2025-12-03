import { Request, Response, NextFunction } from 'express';
import { User } from '@prisma/client';
import { LoginUserDTO } from '../interfaces/login-user.interface.js';
import { loginUserRegister } from '../services/login-user.service.js';
import { successResponse } from '@/utils/error-utils/api-response-handler.util.js';
import { removeSecureData } from '@/utils/user-utils/remove-secure-data.utils.js';
import { TokenPayload } from '@/types/basic-type/basic.type.js';
import { setTokens } from '@/utils/auth-utils/jwt.util.js';

export const loginUserController = async (req: Request<unknown, unknown, LoginUserDTO>, res: Response, next: NextFunction) => {
  try {
    const createdUserData = await loginUserRegister(req.body);
    const userWithoutPassword = removeSecureData(createdUserData);
    const tokenPayload: TokenPayload = {
      userId: createdUserData.id,
      role: createdUserData.role,
    };
    setTokens(res, tokenPayload);
    if (createdUserData) {
      successResponse<Omit<User, 'id' | 'role' | 'password'>>(res, 200, userWithoutPassword);
      return;
    }
  } catch (error: unknown) {
    next(error);
  }
};

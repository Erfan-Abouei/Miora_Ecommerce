import { Request, Response, NextFunction } from 'express';
import { LoginUserDTO } from '@/types/modules/v1/user/dto/user-dto.type';
import { loginUserService } from '../services';
import { successResponse } from '@/utils/error/api-response-handler.util';
import { removeSecureData } from '@/modules/v1/shared/utils/remove-secure-data.utils';
import { TokenPayload } from '@/types/common/basic.type';
import { setTokens } from '@/utils/auth/jwt.util';
import { UserData } from '@/types/modules/v1/user/data/user-date.type';
import { HttpStatus } from '@/constants';

export const loginUserController = async (req: Request<unknown, unknown, LoginUserDTO>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const createdUserData = await loginUserService(req.body);
    const userWithoutPassword = removeSecureData(createdUserData);
    const tokenPayload: TokenPayload = {
      userId: createdUserData.id,
      role: createdUserData.role,
    };
    setTokens(res, tokenPayload);
    if (createdUserData) {
      successResponse<Omit<UserData, 'id' | 'role' | 'password'>>(res, HttpStatus.OK, userWithoutPassword);
      return;
    }
  } catch (error: unknown) {
    next(error);
  }
};

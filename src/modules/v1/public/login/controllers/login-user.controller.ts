import type { Request, Response, NextFunction } from 'express';
import type { AuthUserQueryType, LoginUserDTO, UserData, TokenPayload } from '@/types';
import { loginUserService } from '../services';
import { successResponse, removeSecureData } from '@/modules/v1/shared';
import { setTokens } from '@/utils';
import { HttpStatus } from '@/constants';

export const loginUserController = async (req: Request<unknown, unknown, LoginUserDTO, AuthUserQueryType>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const createdUserData = await loginUserService(req.body);

    const userWithoutPassword = removeSecureData(createdUserData);

    const tokenPayload: TokenPayload = {
      userId: createdUserData.id,
      role: createdUserData.role,
    };

    const isLocal = req.query.local === 'true';

    setTokens(res, tokenPayload, isLocal);

    successResponse<Omit<UserData, 'id' | 'role' | 'password'>>(res, HttpStatus.OK, userWithoutPassword);
  } catch (error: unknown) {
    next(error);
  }
};

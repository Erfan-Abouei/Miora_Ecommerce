import type { Request, Response, NextFunction } from 'express';
import type { AuthUserQueryType } from '@/types/modules/v1/user/user-auth/query/user-query.type';
import type { LoginUserDTO } from '@/types/modules/v1/user/user-auth/dto/user-dto.type';
import type { TokenPayload } from '@/types/common/basic.type';
import type { UserData } from '@/types/modules/v1/user/user-auth/data/user-date.type';
import { loginUserService } from '../services';
import { successResponse } from '@/modules/v1/shared/utils/error/api-response-handler.util';
import { removeSecureData } from '@/modules/v1/shared/utils/remove-secure-data.util';
import { setTokens } from '@/utils/auth/jwt.util';
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

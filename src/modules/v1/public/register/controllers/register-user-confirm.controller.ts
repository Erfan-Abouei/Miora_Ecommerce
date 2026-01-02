import type { Request, Response, NextFunction } from 'express';
import type { AuthUserQueryType } from '@/types/modules/v1/user/user-auth/query/user-query.type';
import type { RegisterUserConfirmDTO } from '@/types/modules/v1/user/user-auth/dto/user-dto.type';
import type { TokenPayload } from '@/types/common/basic.type';
import type { UserData } from '@/types/modules/v1/user/user-auth/data/user-date.type';
import { successResponse } from '@/modules/v1/shared/utils/error/api-response-handler.util';
import { setTokens } from '@/utils/auth/jwt.util';
import { registerUserConfirmService } from '../services';
import { removeSecureData } from '@/modules/v1/shared/utils/remove-secure-data.utils';
import { HttpStatus } from '@/constants';

export const registerUserConfirmController = async (req: Request<unknown, unknown, RegisterUserConfirmDTO, AuthUserQueryType>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await registerUserConfirmService(req.body);
    const userWithoutPassword = removeSecureData(user);
    const tokenPayload: TokenPayload = {
      userId: user.id,
      role: user.role,
    };
    setTokens(res, tokenPayload, req.query.local === 'true');
    successResponse<Omit<UserData, 'password' | 'role' | 'id'>>(res, HttpStatus.CREATED, userWithoutPassword);
  } catch (error: unknown) {
    next(error);
  }
};

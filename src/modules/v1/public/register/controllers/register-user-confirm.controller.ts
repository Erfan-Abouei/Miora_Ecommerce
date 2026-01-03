import type { Request, Response, NextFunction } from 'express';
import type { RegisterConfirmQueryType } from '@/types/modules/v1/user/user-auth/query/user-query.type';
import type { AuthUserQueryType } from '@/types/modules/v1/user/user-auth/query/user-query.type';
import type { RegisterUserConfirmDTO } from '@/types/modules/v1/user/user-auth/dto/user-dto.type';
import type { TokenPayload } from '@/types/common/basic.type';
import type { UserData } from '@/types/modules/v1/user/user-auth/data/user-date.type';
import { successResponse } from '@/modules/v1/shared/utils/error/api-response-handler.util';
import { setTokens } from '@/utils/auth/jwt.util';
import { registerUserConfirmService } from '../services';
import { removeSecureData } from '@/modules/v1/shared/utils/remove-secure-data.utils';
import { HttpStatus } from '@/constants';

export const registerUserConfirmController = async (req: Request<unknown, unknown, RegisterUserConfirmDTO, AuthUserQueryType & RegisterConfirmQueryType>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { dashboard_callback_route } = req.query;
    const isLocal = req.query.local === 'true';

    const user = await registerUserConfirmService(req.body, dashboard_callback_route);
    const userWithoutPassword = removeSecureData(user);
    const tokenPayload: TokenPayload = {
      userId: user.id,
      role: user.role,
    };
    setTokens(res, tokenPayload, isLocal);
    successResponse<Omit<UserData, 'password' | 'role' | 'id'>>(res, HttpStatus.CREATED, userWithoutPassword);
  } catch (error: unknown) {
    next(error);
  }
};

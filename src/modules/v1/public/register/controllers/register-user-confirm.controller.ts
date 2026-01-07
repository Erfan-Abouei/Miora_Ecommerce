import type { Request, Response, NextFunction } from 'express';
import type { UserData, RegisterConfirmQueryType, AuthUserQueryType, RegisterUserConfirmDTO, TokenPayload } from '@/types';
import { successResponse, removeSecureData } from '@/modules/v1/shared';
import { setTokens } from '@/utils';
import { registerUserConfirmService } from '../services';
import { HttpStatus } from '@/constants';

export const registerUserConfirmController = async (req: Request<unknown, unknown, RegisterUserConfirmDTO, AuthUserQueryType & RegisterConfirmQueryType>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { dashboard_callback_route, local } = req.query;
    const isLocal = local === 'true';

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

import type { Request, Response, NextFunction } from 'express';
import type { UserData } from '@/types/modules/v1/user/user-auth/data/user-date.type';
import { profileService } from '../services/';
import { successResponse } from '@/modules/v1/shared/utils/error/api-response-handler.util';
import { removeSecureData } from '@/modules/v1/shared/utils/remove-secure-data.utils';
import { HttpStatus, ResponseMessage } from '@/constants';

export const profileController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userTokenPayload = req.user;
    const userData = await profileService(userTokenPayload);
    const userWithoutPassword = removeSecureData(userData);
    successResponse<Omit<UserData, 'id' | 'role' | 'password'>>(res, HttpStatus.OK, userWithoutPassword, ResponseMessage.SUCCESS);
  } catch (error: unknown) {
    next(error);
  }
};

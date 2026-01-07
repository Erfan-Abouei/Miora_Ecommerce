import type { Request, Response, NextFunction } from 'express';
import type { TokenPayload, UserData } from '@/types';
import { profileService } from '../services/';
import { successResponse, removeSecureData } from '@/modules/v1/shared';
import { HttpStatus, ResponseMessage } from '@/constants';

export const profileController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userTokenPayload = req.user;
    const userData = await profileService(userTokenPayload as TokenPayload);
    const userWithoutPassword = removeSecureData(userData);
    successResponse<Omit<UserData, 'id' | 'role' | 'password'>>(res, HttpStatus.OK, userWithoutPassword, ResponseMessage.SUCCESS);
  } catch (error: unknown) {
    next(error);
  }
};

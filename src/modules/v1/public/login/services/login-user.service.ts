import type { UserData, LoginUserDTO } from '@/types';
import { loginUserRepository } from '../repositories';
import { eventEmitter } from '@/config';
import { PublicEventName } from '@/constants';

export const loginUserService = async (userLoginCredential: LoginUserDTO): Promise<UserData> => {
  const userData = await loginUserRepository(userLoginCredential);

  eventEmitter.emit(PublicEventName.USER_LOGIN, userData);

  return userData;
};

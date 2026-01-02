import type { LoginUserDTO } from '@/types/modules/v1/user/user-auth/dto/user-dto.type';
import type { UserData } from '@/types/modules/v1/user/user-auth/data/user-date.type';
import { loginUserRepository } from '../repositories';
import { eventEmitter } from '@/config';
import { PublicEventName } from '@/constants';

export const loginUserService = async (userLoginCredential: LoginUserDTO, ipAddress: string): Promise<UserData> => {
  const userData = await loginUserRepository(userLoginCredential, ipAddress);

  eventEmitter.emit(PublicEventName.USER_LOGIN, userData);

  return userData as UserData;
};

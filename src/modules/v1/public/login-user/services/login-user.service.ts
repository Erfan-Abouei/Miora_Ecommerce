import cache from '@/database/cache/cache.config';
import { LoginUserDTO } from '@/types/modules/v1/user/dto/user-dto.type';
import { loginUserRepository } from '../repositories';
import { UserData } from '@/types/modules/v1/user/data/user-date.type';
import { eventEmitter } from '@/config';
import { PublicEventName } from '@/constants';

export const loginUserService = async (userLoginCredential: LoginUserDTO, ipAddress: string): Promise<UserData | null> => {
  const userData = await loginUserRepository(userLoginCredential, ipAddress);


  eventEmitter.emit(PublicEventName.USER_LOGIN, userData);

  return userData;
};

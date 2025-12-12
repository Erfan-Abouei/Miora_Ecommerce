import { LoginUserDTO } from '@/types/modules/v1/user/dto/user-dto.type';
import { loginUserRepository } from '../repositories/index';
import { UserData } from '@/types/modules/v1/user/data/user-date.type';
import { eventEmitter } from '@/config/emitter/event-emitter.config';
import { PublicEventName } from '@/constants/events/PUBLIC_EVENTS.constants';

export const loginUserService = async (userLoginCredential: LoginUserDTO): Promise<UserData> => {
  const userData = await loginUserRepository(userLoginCredential);
  // call user login event
  if (userData) eventEmitter.emit(PublicEventName.USER_LOGIN, userData);
  return userData!;
};

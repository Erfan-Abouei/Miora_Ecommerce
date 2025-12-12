import { registerUserConfirmRepository } from '../repositories/index';
import { RegisterUserConfirmDTO } from '@/types/modules/v1/user/dto/user-dto.type';
import { UserData } from '@/types/modules/v1/user/data/user-date.type';
import { eventEmitter } from '@/config/emitter/event-emitter.config';
import { PublicEventName } from '@/constants/events/PUBLIC_EVENTS.constants';

export const registerUserConfrimService = async (confrimUserData: RegisterUserConfirmDTO): Promise<UserData> => {
  const user = (await registerUserConfirmRepository(confrimUserData)) as UserData;

  if (user) {
    eventEmitter.emit(PublicEventName.USER_REGISTER, user);
  }
  return user;
};

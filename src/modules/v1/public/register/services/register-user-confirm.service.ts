import { emitAsync } from '@/modules/v1/shared/events/emit-async.events';
import { registerUserConfirmRepository } from '../repositories';
import type { RegisterUserConfirmDTO } from '@/types/modules/v1/user/user-auth/dto/user-dto.type';
import type { UserData } from '@/types/modules/v1/user/user-auth/data/user-date.type';
import { PublicEventName } from '@/constants';

export const registerUserConfirmService = async (confirmUserData: RegisterUserConfirmDTO): Promise<UserData> => {
  const user = (await registerUserConfirmRepository(confirmUserData)) as UserData;

  await emitAsync<UserData>(PublicEventName.USER_REGISTER_CONFIRM, user);
  return user;
};

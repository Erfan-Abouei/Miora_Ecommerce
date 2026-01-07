import type { UserData, RegisterUserConfirmDTO } from '@/types';
import { emitAsync } from '@/modules/v1/shared/events/emit-async.events';
import { registerUserConfirmRepository } from '../repositories';
import { PublicEventName } from '@/constants';

export const registerUserConfirmService = async (confirmUserData: RegisterUserConfirmDTO, dashboardCallbackRoute: string): Promise<UserData> => {
  const user = await registerUserConfirmRepository(confirmUserData);

  await emitAsync(PublicEventName.USER_REGISTER_CONFIRM, user, dashboardCallbackRoute);
  return user;
};

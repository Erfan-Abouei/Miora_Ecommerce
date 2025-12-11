import { registerUserConfirmRepository } from '../repositories/register-user-confirm.repository';
import { RegisterUserConfirmDTO } from '@/types/modules/v1/user/dto/user-dto.type';
import { UserData } from '@/types/modules/v1/user/data/user-date.type';

export const registerUserConfrimService = async (confrimUserData: RegisterUserConfirmDTO): Promise<UserData> => {
  const user = (await registerUserConfirmRepository(confrimUserData)) as UserData;
  return user;
};

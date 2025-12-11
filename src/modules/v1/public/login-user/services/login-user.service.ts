import { LoginUserDTO } from '@/types/modules/v1/user/dto/user-dto.type';
import { loginUserRepository } from '../repositories/login-user.repository';
import { UserData } from '@/types/modules/v1/user/data/user-date.type';

export const loginUserRegister = async (userLoginCredential: LoginUserDTO): Promise<UserData> => {
  const userData = await loginUserRepository(userLoginCredential);
  return userData!;
};

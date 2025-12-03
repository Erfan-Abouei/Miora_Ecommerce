import { type LoginUserDTO } from '../interfaces/login-user.interface.js';
import { User } from '@prisma/client';
import { loginUserRepository } from '../repositories/login-user.repository.js';
import { removeSecureData } from '@/utils/user-utils/remove-secure-data.utils.js';

export const loginUserRegister = async (userLoginCredential: LoginUserDTO): Promise<User> => {
  const userData = await loginUserRepository(userLoginCredential);
  return userData!;
};

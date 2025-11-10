import { type User } from '@/generated/prisma/client.js';
import { registerUserConfrimRepository } from '../repositories/register-user-confirm.repository.js';
import { RegisterUserConfirmDto } from '../interfaces/register-user-confirm.interface.js';

export const registerUserConfrimService = async (confrimUserData: RegisterUserConfirmDto): Promise<User> => {
  const user = (await registerUserConfrimRepository(confrimUserData)) as User;
  return user;
};

import { type User } from "@prisma/client";
import { registerUserConfirmRepository } from '../repositories/register-user-confirm.repository.js';
import { RegisterUserConfirmDto } from '../interfaces/register-user-confirm.interface.js';

export const registerUserConfrimService = async (confrimUserData: RegisterUserConfirmDto): Promise<User> => {
  const user = (await registerUserConfirmRepository(confrimUserData)) as User;
  return user;
};

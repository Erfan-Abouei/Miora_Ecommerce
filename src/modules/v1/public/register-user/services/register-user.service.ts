import { type User } from '@/generated/prisma/client.js';
import { CreateUserDto } from '../interfaces/register-user.interface.js';
import { registerUserRepository } from '../repositories/register-user.repository.js';

export const registerUserService = async (userData: CreateUserDto): Promise<User> => {
  try {
    const user = await registerUserRepository(userData);
    return user;
  } catch (error) {
    throw error;
  }
};

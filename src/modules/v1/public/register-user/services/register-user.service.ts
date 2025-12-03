import { RegisterUserDto, RegisterUserServerDto } from '../interfaces/register-user.interface.js';
import { registerUserRepository } from '../repositories/register-user.repository.js';

export const registerUserService = async (userData: RegisterUserDto): Promise<RegisterUserServerDto> => {
  const aboutRegisterAndOtpData = await registerUserRepository(userData);
  return aboutRegisterAndOtpData!;
};

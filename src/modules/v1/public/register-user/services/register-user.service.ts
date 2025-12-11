import { RegisterUserDTO, RegisterUserServerDTO } from '@/types/modules/v1/user/dto/user-dto.type';
import { registerUserRepository } from '../repositories/register-user.repository';

export const registerUserService = async (userData: RegisterUserDTO): Promise<RegisterUserServerDTO> => {
  const aboutRegisterAndOtpData = await registerUserRepository(userData);
  return aboutRegisterAndOtpData!;
};

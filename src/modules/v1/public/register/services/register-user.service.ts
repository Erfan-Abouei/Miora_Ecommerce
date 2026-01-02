import type { RegisterUserDTO, RegisterUserServerDTO } from '@/types/modules/v1/user/user-auth/dto/user-dto.type';
import { registerUserRepository } from '../repositories';
import { eventEmitter } from '@/config';
import { PublicEventName } from '@/constants';

export const registerUserService = async (userData: RegisterUserDTO): Promise<RegisterUserServerDTO> => {
  const aboutRegisterAndOtpData = await registerUserRepository(userData);

  eventEmitter.emit(PublicEventName.USER_REGISTER, aboutRegisterAndOtpData);
  return aboutRegisterAndOtpData as RegisterUserServerDTO;
};

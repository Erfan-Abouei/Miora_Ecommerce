import { RegisterUserDTO, RegisterUserServerDTO } from '@/types/modules/v1/user/dto/user-dto.type';
import { registerUserRepository } from '../repositories/index';
import { eventEmitter } from '@/config/emitter/event-emitter.config';
import { PublicEventName } from '@/constants/events/PUBLIC_EVENTS.constants';

export const registerUserService = async (userData: RegisterUserDTO): Promise<RegisterUserServerDTO> => {
  const aboutRegisterAndOtpData = await registerUserRepository(userData);

  if (aboutRegisterAndOtpData) {
    eventEmitter.emit(PublicEventName.USER_REGISTER, aboutRegisterAndOtpData);
  }
  return aboutRegisterAndOtpData!;
};

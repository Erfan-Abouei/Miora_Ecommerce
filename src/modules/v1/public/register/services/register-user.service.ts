import type { RegisterUserDTO, RegisterUserServerDTO } from '@/types';
import { registerUserRepository } from '../repositories';
import { eventEmitter } from '@/config';
import { PublicEventName } from '@/constants';
import { randomUUID } from 'crypto';

export const registerUserService = async (userData: RegisterUserDTO): Promise<RegisterUserServerDTO> => {
  const registerSessionId: string = randomUUID();
  const aboutRegisterAndOtpData = await registerUserRepository(userData, registerSessionId);

  eventEmitter.emit(PublicEventName.USER_REGISTER, aboutRegisterAndOtpData);

  return {
    otp: aboutRegisterAndOtpData.otp,
    register_session_id: registerSessionId,
  };
};

import type { RegisterUserResendOtpDTO, RegisterUserResendOtpServerDTO } from '@/types';
import { registerUserResendOtpRepository } from '../repositories';
import { eventEmitter } from '@/config';
import { PublicEventName } from '@/constants';

export const registerUserResendOtpService = async ({ register_session_id }: RegisterUserResendOtpDTO): Promise<RegisterUserResendOtpServerDTO> => {
  const aboutOtpData = await registerUserResendOtpRepository(register_session_id);
  eventEmitter.emit(PublicEventName.USER_REGISTER_RESEND_OTP, aboutOtpData);
  return aboutOtpData;
};

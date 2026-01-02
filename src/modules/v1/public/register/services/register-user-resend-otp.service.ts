import type { RegisterUserResendOtpDTO, RegisterUserResendOtpServerDTO } from '@/types/modules/v1/user/user-auth/dto/user-dto.type';
import { registerUserResendOtpRepository } from '../repositories';
import { eventEmitter } from '@/config';
import { PublicEventName } from '@/constants';

export const registerUserResendOtpService = async ({ phone_number }: RegisterUserResendOtpDTO): Promise<RegisterUserResendOtpServerDTO> => {
  const aboutOtpData = (await registerUserResendOtpRepository(phone_number)) as RegisterUserResendOtpServerDTO;
  eventEmitter.emit(PublicEventName.USER_REGISTER_RESEND_OTP, aboutOtpData);
  return aboutOtpData;
};

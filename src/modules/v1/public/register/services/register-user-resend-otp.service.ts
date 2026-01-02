import { RegisterUserResendOtpDTO, RegisterUserResendOtpServerDTO } from '@/types/modules/v1/user/user-auth/dto/user-dto.type';
import { registerUserResendOtpRepository } from '../repositories';
import { eventEmitter } from '@/config';
import { PublicEventName } from '@/constants';

export const registerUserResendOtpService = async ({ phone_number }: RegisterUserResendOtpDTO, ipAddress: string): Promise<RegisterUserResendOtpServerDTO> => {
  const aboutOtpData = (await registerUserResendOtpRepository(phone_number, ipAddress)) as RegisterUserResendOtpServerDTO;
  if (aboutOtpData) {
    eventEmitter.emit(PublicEventName.USER_REGISTER_RESEND_OTP, aboutOtpData);
  }
  return aboutOtpData;
};

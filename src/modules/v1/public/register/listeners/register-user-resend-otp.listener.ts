import type { RegisterUserResendOtpServerDTO } from '@/types/modules/v1/user/user-auth/dto/user-dto.type';
import { eventEmitter } from '@/config';
import { PublicEventName } from '@/constants';

eventEmitter.on(PublicEventName.USER_REGISTER_RESEND_OTP, (_otpData: RegisterUserResendOtpServerDTO): void => {
  // user register resend otp notification !
});

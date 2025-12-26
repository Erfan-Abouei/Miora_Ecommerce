import { eventEmitter } from '@/config';
import { PublicEventName } from '@/constants';
import { RegisterUserResendOtpServerDTO } from '@/types/modules/v1/user/user-auth/dto/user-dto.type';

eventEmitter.on(PublicEventName.USER_REGISTER_RESEND_OTP, (otpData: RegisterUserResendOtpServerDTO): void => {
  // user register resend otp notification !
});

import { type ErrorsResponse } from '@/types/error/error-response.type';
import { ErrorCode, HttpStatus, ResponseMessage, ValidationMessage } from '@/constants';
import { RegisterUserResendOtpServerDTO } from '@/types/modules/v1/user/user-auth/dto/user-dto.type';
import { throwValidationError } from '@/utils/error/throw-validation-error.util';
import { randomInt } from 'crypto';
import { ENV } from '@/config';
import { cacheGet, cacheSet, cacheTtl } from '@/database/cache/cache.handler';

export const registerUserResendOtpRepository = async (phone_number: number): Promise<RegisterUserResendOtpServerDTO | null> => {
  const errors: ErrorsResponse = {};
  const key = `otp_resend_attempts_${phone_number}`;
  const otpResendAttempts: number = await cacheGet<number>(key) || 0;
  const hasUserInQues = await cacheGet(`email_${phone_number}`);

  if (otpResendAttempts >= ENV.OTP_RESEND_ATTEMPS) {
    throwValidationError({
      message: ResponseMessage.TOO_MANY_REQUESTS,
      errorCode: ErrorCode.TOO_MANY_REQUESTS,
      statusCode: HttpStatus.TOO_MANY_REQUESTS,
    });
    return null;
  }

  if (!hasUserInQues) {
    errors.error_message = [ValidationMessage.USER_NOT_IN_REGISTER_QUEUE];
    throwValidationError({
      message: ResponseMessage.DATA_CONFLICT,
      statusCode: HttpStatus.CONFLICT,
      errorCode: ErrorCode.DATA_CONFLICT,
      details: errors,
    });
  }

  const existingOtp: number | null = await cacheGet(`otp_${phone_number}`);
  const otpTtl: number = Number(await cacheTtl(`otp_${phone_number}`));

  if (existingOtp) {
    errors.error_message = [ValidationMessage.OTP_HAS_EXISTED];
    errors.expire_otp_timer = [otpTtl.toString()];

    throwValidationError({
      message: ResponseMessage.DATA_CONFLICT,
      details: errors,
      errorCode: ErrorCode.DATA_CONFLICT,
      statusCode: HttpStatus.CONFLICT,
    });
    return null;
  }

  const randomFiveDigits: number = randomInt(10_000, 100_000);
  await cacheSet(`otp_${phone_number}`, randomFiveDigits, ENV.EXPIRE_OTP_TIMER);
  await cacheSet(key, otpResendAttempts + 1, ENV.OTP_RESEND_ATTEMPS_TIMER);
  const newOtpTtl: number | null = await cacheTtl(`otp_${phone_number}`) as number
  return {
    expire_otp_timer: newOtpTtl,
    otp: randomFiveDigits,
  };
};

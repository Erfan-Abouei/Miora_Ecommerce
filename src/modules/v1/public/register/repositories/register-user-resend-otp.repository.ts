import { type ErrorsResponse } from '@/types/error/error-response.type';
import { ErrorCode, HttpStatus, ResponseMessage, ValidationMessage } from '@/constants';
import { RegisterUserResendOtpServerDTO } from '@/types/modules/v1/user/user-auth/dto/user-dto.type';
import { throwValidationError } from '@/modules/v1/shared/utils/error/throw-validation-error.util';
import { randomInt } from 'crypto';
import { ENV } from '@/config';
import { cacheGet, cacheSet, cacheTtl } from '@/database/cache/cache.handler';
import { cacheNameBuilder } from '@/utils/cache/cache-name-builder';
import { CacheKey } from '@/constants';

export const registerUserResendOtpRepository = async (phone_number: number, ipAddress: string): Promise<RegisterUserResendOtpServerDTO | null> => {
  const errors: ErrorsResponse = {};
  const resendAttemptKey = cacheNameBuilder(CacheKey.REGISTER_USER_ATTEMPT, `phone_number_${ipAddress}`);
  const emailKey = cacheNameBuilder(CacheKey.REGISTER_USER, `${phone_number}:email`);
  const otpKey = cacheNameBuilder(CacheKey.REGISTER_USER, `${phone_number}:otp`);

  const otpResendAttempts: number = (await cacheGet<number>(resendAttemptKey)) || 0;
  const hasUserInQues = await cacheGet(emailKey);

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

  const existingOtp: number | null = await cacheGet(otpKey);
  const otpTtl: number = Number(await cacheTtl(otpKey));

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
  await cacheSet(otpKey, randomFiveDigits, ENV.EXPIRE_OTP_TIMER);
  await cacheSet(resendAttemptKey, otpResendAttempts + 1, ENV.OTP_RESEND_ATTEMPS_TIMER);
  const newOtpTtl: number | null = (await cacheTtl(otpKey)) as number;
  return {
    expire_otp_timer: newOtpTtl,
    otp: randomFiveDigits,
  };
};

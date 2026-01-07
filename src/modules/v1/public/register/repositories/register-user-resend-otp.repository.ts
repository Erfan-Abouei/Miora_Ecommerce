import type { RegisterUserResendOtpServerDTO, ErrorsResponse } from '@/types';
import { ErrorCode, HttpStatus, ResponseMessage, ValidationMessage } from '@/constants';
import { throwValidationError } from '@/modules/v1/shared';
import { randomInt } from 'crypto';
import { ENV } from '@/config';
import { cacheGet, cacheSet, cacheTtl } from '@/database/cache/cache.handler';
import { cacheNameBuilder } from '@/utils';
import { CacheKey } from '@/constants';

export const registerUserResendOtpRepository = async (registerSessionId: string): Promise<RegisterUserResendOtpServerDTO> => {
  const errors: ErrorsResponse = {};

  const phoneKey = cacheNameBuilder(CacheKey.REGISTER_USER, `${registerSessionId}:phone`);
  const emailKey = cacheNameBuilder(CacheKey.REGISTER_USER, `${registerSessionId}:email`);
  const otpKey = cacheNameBuilder(CacheKey.REGISTER_USER, `${registerSessionId}:otp`);
  const attemptsKey = cacheNameBuilder(CacheKey.REGISTER_USER, `${registerSessionId}:resend_attempts`);
  const blockKey = cacheNameBuilder(CacheKey.REGISTER_USER, `${registerSessionId}:blocked`);

  const isBlocked: boolean | null = await cacheGet<boolean>(blockKey);
  if (isBlocked !== null) {
    const blockTtl = await cacheTtl(blockKey);
    errors.error_message = [ValidationMessage.OTP_RESEND_BLOCKED];
    errors.block_time_remaining = [String(blockTtl ?? 0)];

    throwValidationError({
      message: ResponseMessage.TOO_MANY_REQUESTS,
      statusCode: HttpStatus.TOO_MANY_REQUESTS,
      errorCode: ErrorCode.TOO_MANY_REQUESTS,
      details: errors,
    });
  }

  const phoneNumber = await cacheGet<string>(phoneKey);
  const email = await cacheGet<string>(emailKey);

  if (phoneNumber === null && email === null) {
    errors.error_message = [ValidationMessage.USER_NOT_IN_REGISTER_QUEUE];
    throwValidationError({
      message: ResponseMessage.DATA_CONFLICT,
      statusCode: HttpStatus.CONFLICT,
      errorCode: ErrorCode.DATA_CONFLICT,
      details: errors,
    });
  }

  let attempts = (await cacheGet<number>(attemptsKey)) ?? 0;

  attempts++;

  if (attempts > ENV.OTP_RESEND_ATTEMPTS) {
    await cacheSet(blockKey, true, ENV.OTP_RESEND_ATTEMPTS_TIMER);

    errors.error_message = [ValidationMessage.OTP_RESEND_LIMIT_EXCEEDED];
    errors.block_time_remaining = [ENV.OTP_RESEND_ATTEMPTS_TIMER.toString()];

    throwValidationError({
      message: ResponseMessage.TOO_MANY_REQUESTS,
      statusCode: HttpStatus.TOO_MANY_REQUESTS,
      errorCode: ErrorCode.TOO_MANY_REQUESTS,
      details: errors,
    });
  }

  const identifier: string = (phoneNumber ?? email) as string;
  const activeRegisterKey = cacheNameBuilder(CacheKey.REGISTER_USER, `${identifier}:register_active`);

  await cacheSet(attemptsKey, attempts, ENV.REGISTER_QUEUE_TTL);
  await cacheSet(activeRegisterKey, registerSessionId, ENV.EXPIRE_OTP_TIMER);

  const randomFiveDigits = randomInt(10_000, 100_000);
  await cacheSet(otpKey, randomFiveDigits, ENV.EXPIRE_OTP_TIMER);
  const newOtpTtl = (await cacheTtl(otpKey)) as number;

  return {
    expire_otp_timer: newOtpTtl,
    otp: randomFiveDigits,
  };
};

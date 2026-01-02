import type { ErrorsResponse } from '@/types/error/error-response.type';
import type { RegisterUserDTO, RegisterUserServerDTO } from '@/types/modules/v1/user/user-auth/dto/user-dto.type';
import { throwValidationError } from '@/modules/v1/shared/utils/error/throw-validation-error.util';
import { hashPassword } from '@/utils/auth/password.util';
import { UserModel } from '@/database/models/v1/user';
import { ErrorCode, HttpStatus, ResponseMessage, ValidationMessage } from '@/constants';
import { buildWhereConditions } from '@/modules/v1/shared/utils/build-where-conditions.utils';
import { ENV } from '@/config';
import { randomInt } from 'crypto';
import { cacheGet, cacheSet, cacheTtl } from '@/database/cache/cache.handler';
import { CacheKey } from '@/constants';
import { cacheNameBuilder } from '@/utils/cache/cache-name-builder';

export const registerUserRepository = async ({ email, password, phone_number }: RegisterUserDTO): Promise<RegisterUserServerDTO | unknown> => {
  const phoneKey = cacheNameBuilder(CacheKey.REGISTER_USER, `${phone_number}:phone`);
  const emailKey = cacheNameBuilder(CacheKey.REGISTER_USER, `${phone_number}:email`);
  const passwordKey = cacheNameBuilder(CacheKey.REGISTER_USER, `${phone_number}:password`);
  const otpKey = cacheNameBuilder(CacheKey.REGISTER_USER, `${phone_number}:otp`);

  const existingOtp: number | null = await cacheGet(otpKey);

  if (existingOtp !== null) {
    const otpTtl: number = (await cacheTtl(otpKey)) as number;

    return {
      expire_otp_timer: otpTtl,
      otp: existingOtp, // for development
    };
  }

  const errors: ErrorsResponse = {};

  const existingUser = await UserModel.findOne({
    where: buildWhereConditions({ email, phone_number }),
  });

  if (existingUser) {
    if (existingUser.getDataValue('email') === email) {
      errors.email = [ValidationMessage.EMAIL_CONFLICT];
    }
    if (existingUser.getDataValue('phone_number') === phone_number) {
      errors.phone_number = [ValidationMessage.PHONE_NUMBER_CONFLICT];
    }
  }

  if (Object.keys(errors).length > 0) {
    throwValidationError({
      details: errors,
      errorCode: ErrorCode.DATA_CONFLICT,
      message: ResponseMessage.DATA_CONFLICT,
      statusCode: HttpStatus.CONFLICT,
    });
    return;
  }

  const hashedPassword = await hashPassword(password);
  const randomFiveDigits: number = randomInt(10_000, 100_000);

  await cacheSet(phoneKey, phone_number, ENV.REGISTER_QUEUE_TTL);
  await cacheSet(emailKey, email, ENV.REGISTER_QUEUE_TTL);
  await cacheSet(passwordKey, hashedPassword, ENV.REGISTER_QUEUE_TTL);
  await cacheSet(otpKey, randomFiveDigits, ENV.EXPIRE_OTP_TIMER);
  const otpTtl: number = (await cacheTtl(otpKey)) as number;

  return {
    expire_otp_timer: otpTtl,
    otp: randomFiveDigits, // for development
  };
};

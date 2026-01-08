import type { ErrorsResponse, RegisterUserDTO, RegisterUserServerDTO } from '@/types';
import { throwValidationError } from '@/modules/v1/shared';
import { UserModel } from '@/database/models/v1/user';
import { ErrorCode, HttpStatus, ResponseMessage, ValidationMessage, CacheKey } from '@/constants';
import { buildWhereConditions } from '@/modules/v1/shared';
import { ENV } from '@/config';
import { randomInt } from 'crypto';
import { cacheGet, cacheSet } from '@/database/cache/cache.handler';
import { cacheNameBuilder } from '@/utils';

export const registerUserRepository = async ({ email, phone_number, password }: RegisterUserDTO, registerSessionId: string): Promise<RegisterUserServerDTO> => {
  const errors: ErrorsResponse = {};

  const identifier: string = (email ?? phone_number) as string;

  const activeRegisterKey = cacheNameBuilder(CacheKey.REGISTER_USER, `${identifier}:register_active`);

  const existingActiveSession = await cacheGet(activeRegisterKey);
  if (existingActiveSession !== null) {
    throwValidationError({
      statusCode: HttpStatus.CONFLICT,
      errorCode: ErrorCode.DATA_CONFLICT,
      message: ResponseMessage.DATA_CONFLICT,
      details: {
        error_message: [ValidationMessage.OTP_HAS_EXISTED],
      },
    });
  }

  const otpKey = cacheNameBuilder(CacheKey.REGISTER_USER, `${registerSessionId}:otp`);
  const passwordKey = cacheNameBuilder(CacheKey.REGISTER_USER, `${registerSessionId}:password`);

  const existingUser = await UserModel.findOne({
    where: buildWhereConditions({ email, phone_number }),
  });

  if (existingUser) {
    if (email !== null && existingUser.getDataValue('email') === email) {
      errors.email = [ValidationMessage.EMAIL_CONFLICT];
    }
    if (phone_number !== null && existingUser.getDataValue('phone_number') === phone_number) {
      errors.phone_number = [ValidationMessage.PHONE_NUMBER_CONFLICT];
    }

    if (Object.keys(errors).length > 0) {
      throwValidationError({
        statusCode: HttpStatus.CONFLICT,
        errorCode: ErrorCode.DATA_CONFLICT,
        message: ResponseMessage.DATA_CONFLICT,
        details: errors,
      });
    }
  }

  const otp = randomInt(10_000, 100_000);

  if (phone_number !== null) {
    const phoneKey = cacheNameBuilder(CacheKey.REGISTER_USER, `${registerSessionId}:phone`);
    await cacheSet(phoneKey, phone_number, ENV.REGISTER_QUEUE_TTL);
  }

  if (email !== null) {
    const emailKey = cacheNameBuilder(CacheKey.REGISTER_USER, `${registerSessionId}:email`);
    await cacheSet(emailKey, email, ENV.REGISTER_QUEUE_TTL);
  }

  await cacheSet(passwordKey, password, ENV.REGISTER_QUEUE_TTL);
  await cacheSet(otpKey, otp, ENV.EXPIRE_OTP_TIMER);
  await cacheSet(activeRegisterKey, registerSessionId, ENV.EXPIRE_OTP_TIMER);

  return {
    otp,
    register_session_id: registerSessionId,
  };
};

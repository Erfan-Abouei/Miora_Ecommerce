import type { UserData, RegisterUserConfirmDTO, ErrorsResponse } from '@/types';
import bcrypt from 'bcryptjs';
import { throwValidationError } from '@/modules/v1/shared';
import { UserModel } from '@/database/models/v1/user';
import { ErrorCode, HttpStatus, ResponseMessage, ValidationMessage, CacheKey } from '@/constants';
import { cacheDel, cacheGet } from '@/database/cache/cache.handler';
import { cacheNameBuilder } from '@/utils';
import { ENV } from '@/config';

export const registerUserConfirmRepository = async ({ otp, register_session_id }: RegisterUserConfirmDTO): Promise<UserData> => {
  const errors: ErrorsResponse = {};
  const phoneKey = cacheNameBuilder(CacheKey.REGISTER_USER, `${register_session_id}:phone`);
  const emailKey = cacheNameBuilder(CacheKey.REGISTER_USER, `${register_session_id}:email`);
  const otpKey = cacheNameBuilder(CacheKey.REGISTER_USER, `${register_session_id}:otp`);
  const passwordKey = cacheNameBuilder(CacheKey.REGISTER_USER, `${register_session_id}:password`);
  const attemptsKey = cacheNameBuilder(CacheKey.REGISTER_USER, `${register_session_id}:resend_attempts`);
  const blockKey = cacheNameBuilder(CacheKey.REGISTER_USER, `${register_session_id}:blocked`);

  const phoneNumber = await cacheGet<string>(phoneKey);
  const email = await cacheGet<string>(emailKey);
  const cachedOtp = await cacheGet<number>(otpKey);
  const password = await cacheGet<string>(passwordKey);
  const identifier: string = (phoneNumber ?? email) as string;

  if (phoneNumber === null && email === null) {
    errors.error_message = [ValidationMessage.REGISTER_SESSION_INVALID_OR_EXPIRED];
  }

  if (password === null) {
    errors.password = [ValidationMessage.PASSWORD_INVALID_OR_EXPIRED];
  }

  if (otp !== cachedOtp?.toString()) {
    errors.otp = [ValidationMessage.OTP_INVALID_OR_EXPIRED];
  }

  if (Object.keys(errors).length > 0) {
    throwValidationError({
      details: errors,
      errorCode: ErrorCode.DATA_CONFLICT,
      message: ResponseMessage.DATA_CONFLICT,
      statusCode: HttpStatus.CONFLICT,
    });
  }

  const hashedPassword: string = await bcrypt.hash(password as string, ENV.BCRYPT_SALT);

  const isRegisterWithEmail: boolean = email !== null && email !== undefined;
  const isRegisterWithPhoneNumber: boolean = phoneNumber !== null && phoneNumber !== undefined;

  const user = await UserModel.create({
    password: hashedPassword,
    email: isRegisterWithEmail ? (email as string) : undefined,
    phone_number: isRegisterWithPhoneNumber ? (phoneNumber as string) : undefined,
    is_phone_verified: !!isRegisterWithPhoneNumber,
    is_email_verified: !!isRegisterWithEmail,
  });

  const activeRegisterKey = cacheNameBuilder(CacheKey.REGISTER_USER, `${identifier}:register_active`);

  const keysToDelete: string[] = [phoneKey, emailKey, otpKey, passwordKey, attemptsKey, blockKey, activeRegisterKey];
  await cacheDel(keysToDelete);

  return user.toJSON();
};

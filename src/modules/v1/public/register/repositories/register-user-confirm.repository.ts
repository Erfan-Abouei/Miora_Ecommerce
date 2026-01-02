import { type ErrorsResponse } from '@/types/error/error-response.type';
import { throwValidationError } from '@/modules/v1/shared/utils/error/throw-validation-error.util';
import { RegisterUserConfirmDTO } from '@/types/modules/v1/user/user-auth/dto/user-dto.type';
import { UserData } from '@/types/modules/v1/user/user-auth/data/user-date.type';
import { UserModel } from '@/database/models/v1/user';
import { ErrorCode, HttpStatus, ResponseMessage, ValidationMessage } from '@/constants';
import { cacheDel, cacheGet } from '@/database/cache/cache.handler';
import { cacheNameBuilder } from '@/utils/cache/cache-name-builder';
import { CacheKey } from '@/constants';

export const registerUserConfirmRepository = async ({ phone_number, otp }: RegisterUserConfirmDTO): Promise<UserData | void> => {
  const errors: ErrorsResponse = {};
  const phoneKey = cacheNameBuilder(CacheKey.REGISTER_USER, `${phone_number}:phone`);
  const emailKey = cacheNameBuilder(CacheKey.REGISTER_USER, `${phone_number}:email`);
  const passwordKey = cacheNameBuilder(CacheKey.REGISTER_USER, `${phone_number}:password`);
  const otpKey = cacheNameBuilder(CacheKey.REGISTER_USER, `${phone_number}:otp`);

  const phoneNumber: string | null = await cacheGet(phoneKey);
  const email: string | null = await cacheGet(emailKey);
  const password: string | null = await cacheGet(passwordKey);
  const cachedOtp: number | null = await cacheGet(otpKey);

  if (!phoneNumber) errors.phone_number = [ValidationMessage.PHONE_NUMBER_INVALID_OR_EXPIRED];
  if (!email) errors.email = [ValidationMessage.EMAIL_INVALID_OR_EXPIRED];
  if (!password) errors.password = [ValidationMessage.PASSWORD_INVALID_OR_EXPIRED];
  if (!cachedOtp || otp !== cachedOtp.toString()) errors.otp = [ValidationMessage.OTP_INVALID_OR_EXPIRED];

  if (Object.keys(errors).length > 0)
    throwValidationError({
      details: errors,
      errorCode: ErrorCode.DATA_CONFLICT,
      message: ResponseMessage.DATA_CONFLICT,
      statusCode: HttpStatus.CONFLICT,
    });

  const user = await UserModel.create({
    phone_number: phoneNumber!,
    email: email!,
    password: password!,
    is_phone_verified: true,
  });

  await cacheDel([phoneKey, emailKey, passwordKey, otpKey]);

  return user.toJSON();
};

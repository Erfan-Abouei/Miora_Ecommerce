import { type ErrorsResponse } from '@/types/error/error-response.type';
import { throwValidationError } from '@/modules/v1/shared/utils/error/throw-validation-error.util';
import { hashPassword } from '@/utils/auth/password.util';
import { RegisterUserDTO, RegisterUserServerDTO } from '@/types/modules/v1/user/user-auth/dto/user-dto.type';
import { UserModel } from '@/database/models/v1/user';
import { ErrorCode, HttpStatus, ResponseMessage, ValidationMessage } from '@/constants';
import { buildWhereConditions } from '@/modules/v1/shared/utils/build-where-conditions.utils';
import { ENV } from '@/config';
import { randomInt } from 'crypto';
import { cacheGet, cacheSet, cacheTtl } from '@/database/cache/cache.handler';

export const registerUserRepository = async ({ email, password, phone_number }: RegisterUserDTO): Promise<RegisterUserServerDTO | void> => {
  const existingOtp: number | null = await cacheGet(`register_otp_${phone_number}`);

  if (existingOtp !== null) {
    const otpTtl: number = (await cacheTtl(`register_otp_${phone_number}`)!) as number;

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

  await cacheSet(`register_phone_number_${phone_number}`, phone_number, ENV.REGISTER_QUEUE_TTL);
  await cacheSet(`register_email_${phone_number}`, email, ENV.REGISTER_QUEUE_TTL);
  await cacheSet(`register_password_${phone_number}`, hashedPassword, ENV.REGISTER_QUEUE_TTL);
  await cacheSet(`register_otp_${phone_number}`, randomFiveDigits, ENV.EXPIRE_OTP_TIMER);
  const otpTtl: number = (await cacheTtl(`register_otp_${phone_number}`)) as number;

  return {
    expire_otp_timer: otpTtl,
    otp: randomFiveDigits, // for development
  };
};

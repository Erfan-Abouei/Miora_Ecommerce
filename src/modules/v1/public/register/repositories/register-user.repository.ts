import { type ErrorsResponse } from '@/types/error/error-response.type';
import cache from '@/database/cache/cache.config';
import { throwValidationError } from '@/utils/error/throw-validation-error.util';
import { hashPassword } from '@/utils/auth/password.util';
import { RegisterUserDTO, RegisterUserServerDTO } from '@/types/modules/v1/user/user-auth/dto/user-dto.type';
import { UserModel } from '@/database/models/v1/user';
import { ErrorCode, HttpStatus, ResponseMessage, ValidationMessage } from '@/constants';
import { buildWhereConditions } from '@/modules/v1/shared/utils/build-where-conditions.utils';
import { ENV } from '@/config';
import { randomInt } from 'crypto';

export const registerUserRepository = async ({ email, password, phone_number }: RegisterUserDTO): Promise<RegisterUserServerDTO | void> => {
  const existingOtp: number | undefined = cache.get(`otp:${phone_number}`);
  if (existingOtp !== undefined) {
    const otpTtl: number = cache.getTtl(`otp:${phone_number}`)!;
    const now = Date.now();
    const expire_otp_timer = Math.floor((otpTtl - now) / 1000); // convert to second

    return {
      expire_otp_timer,
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
    throwValidationError({ details: errors, errorCode: ErrorCode.DATA_CONFLICT, message: ResponseMessage.DATA_CONFLICT, statusCode: HttpStatus.CONFLICT });
    return;
  }

  const hashedPassword = await hashPassword(password);

  const randomFiveDigits: number = randomInt(10_000, 100_000)

  cache.set(`phone_number:${phone_number}`, phone_number, ENV.EXPIRE_OTP_TIMER);
  cache.set(`email:${phone_number}`, email, ENV.EXPIRE_OTP_TIMER);
  cache.set(`password:${phone_number}`, hashedPassword, ENV.EXPIRE_OTP_TIMER);
  cache.set(`otp:${phone_number}`, randomFiveDigits, ENV.EXPIRE_OTP_TIMER);

  return {
    expire_otp_timer: 180,
    otp: randomFiveDigits, // for development
  };
};

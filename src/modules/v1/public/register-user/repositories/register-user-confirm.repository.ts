import { type ErrorsResponse } from '@/types/error/error-response.type';
import cache from '@/database/cache/cache.config';
import { throwValidationError } from '@/utils/error/throw-validation-error.util';
import { RegisterUserConfirmDTO } from '@/types/modules/v1/user/user-auth/dto/user-dto.type';
import { UserData } from '@/types/modules/v1/user/user-auth/data/user-date.type';
import { UserModel } from '@/database/models/v1/user';
import { ErrorCode, HttpStatus, ResponseMessage, ValidationMessage } from '@/constants';

export const registerUserConfirmRepository = async ({ phone_number, otp }: RegisterUserConfirmDTO): Promise<UserData | void> => {
  const errors: ErrorsResponse = {};

  const phoneNumber: string | undefined = cache.get(`phone_number:${phone_number}`);
  const email: string | undefined = cache.get(`email:${phone_number}`);
  const password: string | undefined = cache.get(`password:${phone_number}`);
  const cachedOtp: number | undefined = cache.get(`otp:${phone_number}`);

  if (!phoneNumber) errors.phone_number = [ValidationMessage.PHONE_NUMBER_INVALID_OR_EXPIRED];
  if (!email) errors.email = [ValidationMessage.EMAIL_INVALID_OR_EXPIRED];
  if (!password) errors.password = [ValidationMessage.PASSWORD_INVALID_OR_EXPIRED];
  if (!cachedOtp || otp !== cachedOtp.toString()) errors.otp = [ValidationMessage.OTP_INVALID_OR_EXPIRED];

  if (Object.keys(errors).length > 0) throwValidationError({ details: errors, errorCode: ErrorCode.DATA_CONFLICT, message: ResponseMessage.DATA_CONFLICT, statusCode: HttpStatus.CONFLICT });

  const user = await UserModel.create({
    phone_number: phoneNumber!,
    email: email!,
    password: password!,
    is_phone_verified: !!phoneNumber,
  });

  cache.del([`phone_number:${phone_number}`, `email:${phone_number}`, `password:${phone_number}`, `otp:${phone_number}`]);

  return user.toJSON();
};

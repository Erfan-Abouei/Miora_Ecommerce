import bcrypt from 'bcryptjs';
import cache from '@/database/cache/cache.config';
import { ENV } from '@/config';
import { LoginUserDTO } from '@/types/modules/v1/user/dto/user-dto.type';
import { UserModel } from '@/database/models/v1/user';
import { throwValidationError } from '@/utils/error/throw-validation-error.util';
import { ResponseMessage } from '@/constants';
import { UserData } from '@/types/modules/v1/user/data/user-date.type';
import { ErrorCode, HttpStatus, ValidationMessage } from '@/constants';
import { buildWhereConditions } from '@/modules/v1/shared/utils/build-where-conditions.utils';
import { ErrorsResponse } from '@/types/error/error-response.type';

export const loginUserRepository = async (
  { password, phone_number, email }: LoginUserDTO,
  ipAddress: string
): Promise<UserData | null> => {

  // Generate a unique cache key for the user and IP combination to track login attempts
  const key = `user_${phone_number || email}_ip_${ipAddress}`;
  const attempts = Number(cache.get(key) ?? 0);

  // Block the login if maximum allowed attempts have been exceeded
  if (attempts > Number(ENV.LOGIN_ATTEMPTS_MAX)) {
    throwValidationError({
      message: ResponseMessage.TOO_MANY_REQUESTS,
      errorCode: ErrorCode.TOO_MANY_REQUESTS,
      statusCode: HttpStatus.TOO_MANY_REQUESTS,
    });
  }

  // Initialize error container
  const errors: ErrorsResponse = {};

  // Try to find the user based on phone number or email
  const user = await UserModel.findOne({
    where: buildWhereConditions({ phone_number, email }),
  });

  // If user is not found, increment the attempt counter and throw a NOT FOUND error
  if (!user) {
    errors.error_message = [ValidationMessage.USER_NOT_FOUND];
    throwValidationError({
      details: errors,
      statusCode: HttpStatus.NOT_FOUND,
      message: ResponseMessage.NOT_FOUND,
      errorCode: ErrorCode.NOT_FOUND,
    });
    cache.set(key, attempts + 1);
    return null;
  }

  // Verify the password
  const isValidPassword = await bcrypt.compare(password, user.getDataValue('password') as string);

  // If password is incorrect, increment attempts and throw a DATA CONFLICT error
  if (!isValidPassword) {
    throwValidationError({
      details: { password: [ValidationMessage.PASSWORD_INCORRECT] },
      errorCode: ErrorCode.DATA_CONFLICT,
      message: ResponseMessage.DATA_CONFLICT,
      statusCode: HttpStatus.CONFLICT,
    });
    cache.set(key, attempts + 1);
    return null;
  }

  // Successful login: reset the attempt counter
  cache.del(key);

  return user.toJSON();
};

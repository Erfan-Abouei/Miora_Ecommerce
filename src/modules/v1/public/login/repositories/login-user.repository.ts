import bcrypt from 'bcryptjs';
import { ENV } from '@/config';
import { LoginUserDTO } from '@/types/modules/v1/user/user-auth/dto/user-dto.type';
import { UserModel } from '@/database/models/v1/user';
import { throwValidationError } from '@/utils/error/throw-validation-error.util';
import { ResponseMessage, ErrorCode, HttpStatus, ValidationMessage } from '@/constants';
import { UserData } from '@/types/modules/v1/user/user-auth/data/user-date.type';
import { buildWhereConditions } from '@/modules/v1/shared/utils/build-where-conditions.utils';
import { ErrorsResponse } from '@/types/error/error-response.type';
import { cacheGet, cacheSet, cacheDel } from '@/database/cache/cache.handler';

export const loginUserRepository = async ({ password, phone_number, email }: LoginUserDTO, ipAddress: string): Promise<UserData | null> => {
  const key = `login_user_attempts_${phone_number || email}_ip_${ipAddress}`;
  const attempts = Number(await cacheGet<number>(key) ?? 0);

  if (attempts > ENV.LOGIN_ATTEMPTS_MAX) {
    throwValidationError({
      message: ResponseMessage.TOO_MANY_REQUESTS,
      errorCode: ErrorCode.TOO_MANY_REQUESTS,
      statusCode: HttpStatus.TOO_MANY_REQUESTS,
    });
  }

  const errors: ErrorsResponse = {};

  const user = await UserModel.findOne({
    where: buildWhereConditions({ phone_number, email }),
  });

  if (!user) {
    errors.error_message = [ValidationMessage.USER_NOT_FOUND];
    await cacheSet(key, attempts + 1, ENV.LOGIN_ATTEMPTS_MAX_TIMER);

    throwValidationError({
      details: errors,
      statusCode: HttpStatus.NOT_FOUND,
      message: ResponseMessage.NOT_FOUND,
      errorCode: ErrorCode.NOT_FOUND,
    });
    return null;
  }

  const isValidPassword = await bcrypt.compare(password, user.getDataValue('password') as string);

  if (!isValidPassword) {
    await cacheSet(key, attempts + 1, ENV.LOGIN_ATTEMPTS_MAX_TIMER);

    throwValidationError({
      details: { password: [ValidationMessage.PASSWORD_INCORRECT] },
      errorCode: ErrorCode.DATA_CONFLICT,
      message: ResponseMessage.DATA_CONFLICT,
      statusCode: HttpStatus.CONFLICT,
    });
    return null;
  }

  await cacheDel(key);

  return user.toJSON();
};

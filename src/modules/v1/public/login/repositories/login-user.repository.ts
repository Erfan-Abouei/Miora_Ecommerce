import bcrypt from 'bcryptjs';
import { LoginUserDTO } from '@/types/modules/v1/user/user-auth/dto/user-dto.type';
import { UserModel } from '@/database/models/v1/user';
import { throwValidationError } from '@/modules/v1/shared/utils/error/throw-validation-error.util';
import { ResponseMessage, ErrorCode, HttpStatus, ValidationMessage } from '@/constants';
import { UserData } from '@/types/modules/v1/user/user-auth/data/user-date.type';
import { buildWhereConditions } from '@/modules/v1/shared/utils/build-where-conditions.utils';
import { ErrorsResponse } from '@/types/error/error-response.type';
import { cacheDel } from '@/database/cache/cache.handler';
import { cacheNameBuilder } from '@/utils/cache/cache-name-builder';
import { CacheKey } from '@/constants';

export const loginUserRepository = async ({ password, phone_number, email }: LoginUserDTO, ipAddress: string): Promise<UserData | null> => {
  const loginAttemptCacheKeyName = cacheNameBuilder(CacheKey.LOGIN_USER_ATTEMPT, `${phone_number || email}_${ipAddress}`)

  const errors: ErrorsResponse = {};

  const user = await UserModel.findOne({
    where: buildWhereConditions({ phone_number, email }),
  });

  if (!user) {
    errors.error_message = [ValidationMessage.USER_NOT_FOUND];

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

    throwValidationError({
      details: { password: [ValidationMessage.PASSWORD_INCORRECT] },
      errorCode: ErrorCode.DATA_CONFLICT,
      message: ResponseMessage.DATA_CONFLICT,
      statusCode: HttpStatus.CONFLICT,
    });
    return null;
  }

  await cacheDel(loginAttemptCacheKeyName);

  return user.toJSON();
};

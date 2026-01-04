import type { LoginUserDTO } from '@/types/modules/v1/user/user-auth/dto/user-dto.type';
import type { ErrorsResponse } from '@/types/error/error-response.type';
import type { UserData } from '@/types/modules/v1/user/user-auth/data/user-date.type';
import bcrypt from 'bcryptjs';
import { UserModel } from '@/database/models/v1/user';
import { throwValidationError } from '@/modules/v1/shared/utils/error/throw-validation-error.util';
import { ResponseMessage, ErrorCode, HttpStatus, ValidationMessage } from '@/constants';
import { buildWhereConditions } from '@/modules/v1/shared/utils/build-where-conditions.util';

export const loginUserRepository = async ({ password, phone_number, email }: LoginUserDTO): Promise<UserData | unknown> => {
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
    return;
  }

  const isValidPassword = await bcrypt.compare(password, user.getDataValue('password'));

  if (!isValidPassword) {
    throwValidationError({
      details: { password: [ValidationMessage.PASSWORD_INCORRECT] },
      errorCode: ErrorCode.DATA_CONFLICT,
      message: ResponseMessage.DATA_CONFLICT,
      statusCode: HttpStatus.CONFLICT,
    });
    return;
  }
  return user.toJSON();
};

import bcrypt from 'bcryptjs';
import { LoginUserDTO } from '@/types/modules/v1/user/dto/user-dto.type';
import { UserModel } from '@/database/models/v1/user';
import { throwValidationError } from '@/utils/error/throw-validation-error.util';
import { ResponseMessage } from '@/constants';
import { UserData } from '@/types/modules/v1/user/data/user-date.type';
import { ErrorCode, HttpStatus, ValidationMessage } from '@/constants';
import { buildWhereConditions } from '@/modules/v1/shared/utils/build-where-conditions.utils';
import { ErrorsResponse } from '@/types/error/error-response.type';

export const loginUserRepository = async ({ password, phone_number, email }: LoginUserDTO): Promise<UserData | null> => {
  const errors: ErrorsResponse = {}
  const user = await UserModel.findOne({
    where: buildWhereConditions({ phone_number, email }),
  });

  // user not found
  if (!user) {
    errors.error = [ValidationMessage.USER_NOT_FOUND]
    throwValidationError({
      details: errors,
      statusCode: HttpStatus.NOT_FOUND,
      message: ResponseMessage.NOT_FOUND,
      errorCode: ErrorCode.NOT_FOUND,
    });
    return null;
  }

  // password incorrect
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

  return user.toJSON();
};

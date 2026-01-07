import type { Model } from 'sequelize';
import type { UserData, LoginUserDTO, ErrorsResponse } from '@/types';
import bcrypt from 'bcryptjs';
import { UserModel } from '@/database/models/v1/user';
import { throwValidationError, buildWhereConditions } from '@/modules/v1/shared';
import { ResponseMessage, ErrorCode, HttpStatus, ValidationMessage } from '@/constants';

export const loginUserRepository = async ({ password, phone_number, email }: LoginUserDTO): Promise<UserData> => {
  const errors: ErrorsResponse = {};

  const user = await UserModel.findOne({
    where: buildWhereConditions({ phone_number, email }),
  });

  if (user === null || user === undefined) {
    errors.error_message = [ValidationMessage.USER_NOT_FOUND];

    throwValidationError({
      details: errors,
      statusCode: HttpStatus.NOT_FOUND,
      message: ResponseMessage.NOT_FOUND,
      errorCode: ErrorCode.NOT_FOUND,
    });
  }

  const isValidPassword = await bcrypt.compare(password, (user as Model<UserData>).getDataValue('password'));

  if (isValidPassword === null || isValidPassword === undefined) {
    throwValidationError({
      details: { password: [ValidationMessage.PASSWORD_INCORRECT] },
      errorCode: ErrorCode.DATA_CONFLICT,
      message: ResponseMessage.DATA_CONFLICT,
      statusCode: HttpStatus.CONFLICT,
    });
  }
  return (user as Model<UserData>).toJSON();
};

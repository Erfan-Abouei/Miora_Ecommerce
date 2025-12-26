import { ErrorCode, HttpStatus, ResponseMessage, ValidationMessage } from '@/constants';
import { UserModel } from '@/database/models/v1/user';
import { ErrorsResponse } from '@/types/error/error-response.type';
import { UserData } from '@/types/modules/v1/user/user-auth/data/user-date.type';
import { throwValidationError } from '@/utils/error/throw-validation-error.util';

export const profileRepository = async (userId: string): Promise<UserData | null> => {
  const errors: ErrorsResponse = {};
  const user = await UserModel.findByPk(userId);

  if (!user) {
    errors.error_message = [ValidationMessage.USER_NOT_FOUND];
    throwValidationError({ details: errors, message: ResponseMessage.NOT_FOUND, errorCode: ErrorCode.NOT_FOUND, statusCode: HttpStatus.NOT_FOUND });
    return null;
  }
  return user.toJSON();
};

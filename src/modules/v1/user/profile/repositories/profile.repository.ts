import type { UserData, ErrorsResponse } from '@/types';
import { ErrorCode, HttpStatus, ResponseMessage, ValidationMessage } from '@/constants';
import { UserModel } from '@/database/models/v1/user';
import { throwValidationError } from '@/modules/v1/shared';

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

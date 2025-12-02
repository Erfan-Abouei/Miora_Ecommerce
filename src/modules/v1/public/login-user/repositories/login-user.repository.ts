import { type LoginUserDTO } from '../interfaces/login-user.interface.js';
import { User } from '@prisma/client';
import { throwValidationError } from '@/utils/error-utils/throw-validation-error.util.js';
import { ResponseMessage } from '@/constants/error-constants/RESPONSE_MESSAGE.constant.js';
import { ensureUserExists } from '@/utils/user-utils/ensure-user.utils.js';
import prisma from '@/config/database/database.config.js';
import bcrypt from 'bcryptjs';

export const loginUserRepository = async (credentials: LoginUserDTO): Promise<User | void> => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ phone_number: credentials.phone_number ?? undefined }, { email: credentials.email ?? undefined }],
    },
  });

  // user not found
  if (!ensureUserExists(user)) {
    throwValidationError({
      details: { error: ['کاربری با این مشخصات وجود ندارد.'] },
      statusCode: 404,
      message: ResponseMessage.NOT_FOUND_MESSAGE,
    });
    return;
  }

  // password incorrect
  const isValidPassword = await bcrypt.compare(credentials?.password, user.password);
  if (!isValidPassword) {
    throwValidationError({
      details: { password: ['گذرواژه وارد شده صحیح نمی‌باشد.'] },
    });
    return;
  }

  return user;
};

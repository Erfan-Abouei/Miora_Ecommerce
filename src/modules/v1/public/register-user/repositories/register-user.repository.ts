import { type User } from '@/generated/prisma/client.js';
import prisma from '@/config/database.config.js';
import { CreateUserDto } from '../interfaces/register-user.interface.js';
import { throwValidationError } from '@/utils/throw-validation-error.utils.js';
import { hashPassword } from '@/utils/password.utils.js';

export const registerUserRepository = async ({ email, password, phone_number }: CreateUserDto): Promise<User> => {
  try {
    // for send manual validation error
    const errors: Record<string, string[]> = {};
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone_number }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        errors.email = ['ایمیل وارد شده قبلا ثبت شده است.'];
      }
      if (existingUser.phone_number === phone_number) {
        errors.phone_number = ['شماره تلفن وارد شده قبلا ثبت شده است.'];
      }
    }

    if (Object.keys(errors).length > 0) throwValidationError(errors);

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        phone_number,
        email,
        password: hashedPassword,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

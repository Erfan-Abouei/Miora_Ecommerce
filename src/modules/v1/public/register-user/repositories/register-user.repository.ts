import { type ErrorsResponse } from '@/types/error-type/error-response.type.js';
import prisma from '@/config/database/database.config.js';
import cache from '@/config/database/cache.config.js';
import { throwValidationError } from '@/utils/error-utils/throw-validation-error.util.js';
import { hashPassword } from '@/utils/auth-utils/password.util.js';
import { RegisterUserDto, RegisterUserServerDto } from '../interfaces/register-user.interface.js';

export const registerUserRepository = async ({
  email,
  password,
  phone_number,
}: RegisterUserDto): Promise<RegisterUserServerDto> => {
  const existingOtp: number | undefined = cache.get(`otp:${phone_number}`);
  if (existingOtp !== undefined) {
    const otpTtl: number = cache.getTtl(`otp:${phone_number}`)!;
    const now = Date.now();
    const expire_otp_timer = Math.floor((otpTtl - now) / 1000); // convert to second

    return {
      expire_otp_timer,
      otp: existingOtp, // for development
    };
  }

  const errors: ErrorsResponse = {};

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

  const randomFourDigits: number = Math.floor(1000 + Math.random() * 9000);

  cache.set(`phone_number:${phone_number}`, phone_number, 180);
  cache.set(`email:${phone_number}`, email, 180);
  cache.set(`password:${phone_number}`, hashedPassword, 180);
  cache.set(`otp:${phone_number}`, randomFourDigits, 180);

  return {
    expire_otp_timer: 180,
    otp: randomFourDigits, // for development
  };
};

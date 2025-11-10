import { type ErrorsResponse } from '@/types/error-type/error-response.type.js';
import prisma from '@/config/database/database.config.js';
import redis from '@/config/database/redis.config.js';
import { throwValidationError } from '@/utils/throw-validation-error.util.js';
import { hashPassword } from '@/utils/password.util.js';
import { RegisterUserDto, RegisterUserServerDto } from '../interfaces/register-user.interface.js';

export const registerUserRepository = async ({
  email,
  password,
  phone_number,
}: RegisterUserDto): Promise<RegisterUserServerDto> => {
  // Check if the user has already requested an OTP and it is still valid
  const existingOtp: number | null = await redis.get(`otp:${phone_number}`);
  if (existingOtp) {
    // Get the remaining TTL for the OTP
    const otpTtl: number | null = await redis.ttl(`otp:${phone_number}`);
    return {
      expire_otp_timer: otpTtl,
      otp: existingOtp, // For development purposes
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

  // Cache user data and OTP in Redis for 3 minutes (180 seconds)
  await Promise.all([
    redis.set(`phone_number:${phone_number}`, phone_number, { ex: 180 }),
    redis.set(`email:${phone_number}`, email, { ex: 180 }),
    redis.set(`password:${phone_number}`, hashedPassword, { ex: 180 }),
    redis.set(`otp:${phone_number}`, randomFourDigits, { ex: 180 }),
  ]);

  return {
    expire_otp_timer: 180,
    otp: randomFourDigits, // For development purposes
  };
};

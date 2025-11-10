import { type User } from '@/generated/prisma/client.js';
import { type ErrorsResponse } from '@/types/error-type/error-response.type.js';
import prisma from '@/config/database/database.config.js';
import redis from '@/config/database/redis.config.js';
import { throwValidationError } from '@/utils/throw-validation-error.util.js';
import { RegisterUserConfirmDto } from '../interfaces/register-user-confirm.interface.js';

export const registerUserConfrimRepository = async ({
  phone_number,
  otp,
}: RegisterUserConfirmDto): Promise<User | void> => {
  const errors: ErrorsResponse = {};

  const phoneNumber: string | null = await redis.get(`phone_number:${phone_number}`);
  const email: string | null = await redis.get(`email:${phone_number}`);
  const password: string | null = await redis.get(`password:${phone_number}`);
  const cachedOtp: string | null = await redis.get(`otp:${phone_number}`);

  if (!phoneNumber) errors.phone_number = ['شماره تلفن یافت نشد یا منقضی شده است.'];
  if (!email) errors.email = ['ایمیل یافت نشد یا منقضی شده است.'];
  if (!password) errors.password = ['رمز عبور یافت نشد یا منقضی شده است.'];
  if (!cachedOtp || otp !== cachedOtp.toString()) errors.otp = ['کد عبور یافت نشد یا اشتباه است.'];

  if (Object.keys(errors).length > 0) throwValidationError(errors);

  const user = await prisma.user.create({
    data: {
      phone_number: phoneNumber!,
      email: email!,
      password: password!,
    },
  });

  await Promise.all([
    redis.del(`phone_number:${phone_number}`),
    redis.del(`email:${phone_number}`),
    redis.del(`password:${phone_number}`),
    redis.del(`otp:${phone_number}`),
  ]);

  return user;
};

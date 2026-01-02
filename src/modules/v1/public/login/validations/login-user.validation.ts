import { Pattern } from '@/constants';
import { ValidationMessage } from '@/constants';
import { z } from 'zod';

export const loginUserSchema = z
  .object({
    phone_number: z.string(ValidationMessage.PHONE_REQUIRED).regex(new RegExp(Pattern.PHONE_NUMBER), ValidationMessage.PHONE_INVALID).optional(),

    email: z.string(ValidationMessage.EMAIL_REQUIRED).email(ValidationMessage.EMAIL_INVALID).optional(),

    password: z.string(ValidationMessage.PASSWORD_REQUIRED).min(6, ValidationMessage.PASSWORD_INVALID),
  })
  .refine(
    (data) =>
      (data.phone_number !== undefined && data.phone_number !== '') ||
      (data.email !== undefined && data.email !== ''),
    {
      message: ValidationMessage.PHONE_OR_EMAIL_REQUIRED,
      path: ['error_message'],
    }
  )
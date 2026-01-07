import { Pattern } from '@/constants';
import { ValidationMessage } from '@/constants';
import { z } from 'zod';

export const registerUserSchema = z
  .object({
    phone_number: z.string().regex(new RegExp(Pattern.PHONE_NUMBER), ValidationMessage.PHONE_INVALID).optional(),

    email: z.string().email(ValidationMessage.EMAIL_INVALID).optional(),

    password: z.string(ValidationMessage.PASSWORD_REQUIRED).min(6, ValidationMessage.PASSWORD_INVALID),
  })
  .refine((data) => (data.phone_number !== undefined && data.phone_number !== '') || (data.email !== undefined && data.email !== ''), {
    message: ValidationMessage.PHONE_OR_EMAIL_REQUIRED,
    path: ['error_message'],
  })
  .refine((data) => !(data.phone_number !== undefined && data.phone_number !== '' && data.email !== undefined && data.email !== ''), {
    message: ValidationMessage.ONLY_ONE_CONTACT_METHOD_ALLOWED,
    path: ['error_message'],
  });

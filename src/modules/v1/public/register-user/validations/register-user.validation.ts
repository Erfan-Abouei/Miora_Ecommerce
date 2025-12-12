import { Pattern } from '@/constants';
import { ValidationMessage } from '@/constants';
import { z } from 'zod';

export const registerUserSchema = z.object({
  phone_number: z.string(ValidationMessage.PHONE_REQUIRED).regex(new RegExp(Pattern.PHONE_NUMBER), ValidationMessage.PHONE_INVALID),

  email: z.string(ValidationMessage.EMAIL_REQUIRED).email(ValidationMessage.EMAIL_INVALID),

  password: z.string(ValidationMessage.PASSWORD_REQUIRED).min(6, ValidationMessage.PASSWORD_INVALID),
});

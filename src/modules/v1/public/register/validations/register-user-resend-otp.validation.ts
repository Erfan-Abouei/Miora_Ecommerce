import { z } from 'zod';
import { Pattern, ValidationMessage } from '@/constants';

export const registerUserResendOtpSchema = z.object({
  phone_number: z.string(ValidationMessage.PHONE_REQUIRED).regex(new RegExp(Pattern.PHONE_NUMBER), ValidationMessage.PHONE_INVALID),
});

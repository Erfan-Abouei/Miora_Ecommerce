import { Pattern } from '@/constants';
import { ValidationMessage } from '@/constants';
import { z } from 'zod';

export const registerUserConfirmSchema = z.object({
  phone_number: z.string(ValidationMessage.PHONE_REQUIRED).regex(new RegExp(Pattern.PHONE_NUMBER), ValidationMessage.PHONE_INVALID),

  otp: z.string(ValidationMessage.OTP_REQUIRED).length(5, ValidationMessage.OTP_INVALID),
});

import { ValidationMessage } from '@/constants';
import { z } from 'zod';

export const registerUserConfirmSchema = z.object({
  otp: z.string(ValidationMessage.OTP_REQUIRED).length(5, ValidationMessage.OTP_INVALID),
  register_session_id: z.string(ValidationMessage.REGISTER_SESSION_ID_REQUIRED),
});

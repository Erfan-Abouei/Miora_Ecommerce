import { z } from 'zod';
import { ValidationMessage } from '@/constants';

export const registerUserResendOtpSchema = z.object({
  register_session_id: z.string(ValidationMessage.REGISTER_SESSION_ID_REQUIRED),
});

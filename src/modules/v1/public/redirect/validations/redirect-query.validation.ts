import { ValidationMessage } from '@/constants';
import z from 'zod';

export const redirectQuerySchema = z.object({
  redirect_url: z.string(ValidationMessage.REDIRECT_URL_REQUIRED_QUERY),
});

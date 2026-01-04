import type z from 'zod';
import type { redirectQuerySchema } from '@/modules/v1/public/redirect';

export type RedirectQueryType = z.infer<typeof redirectQuerySchema>;

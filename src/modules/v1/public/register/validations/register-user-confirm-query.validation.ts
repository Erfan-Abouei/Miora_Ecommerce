import { ValidationMessage } from '@/constants';
import { z } from 'zod';

export const registerUserConfirmQuerySchema = z.object({
  dashboard_callback_route: z.string(ValidationMessage.DASHBOARD_CALLBACK_ROUTE_REQUIRED_QUERY).url(ValidationMessage.DASHBOARD_CALLBACK_ROUTE_IS_URL_QUERY),
});

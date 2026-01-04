import type { UserData } from '@/types/modules/v1/user/user-auth/data/user-date.type';
import { eventEmitter } from '@/config';
import { PublicEventName } from '@/constants';
import { sendWelcomeEmail } from '@/modules/v1/shared/utils/send-welcome-email.util';

eventEmitter.on(PublicEventName.USER_REGISTER_CONFIRM, async (userData: UserData, dashboardCallbackRoute: string): Promise<void> => {
  // user register confirm notification !
  await sendWelcomeEmail(userData.email, dashboardCallbackRoute);
});

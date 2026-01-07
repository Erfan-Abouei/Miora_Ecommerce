import type { UserData } from '@/types';
import { sendWelcomeEmail } from '@/modules/v1/shared';
import { eventEmitter } from '@/config';
import { PublicEventName } from '@/constants';

eventEmitter.on(PublicEventName.USER_REGISTER_CONFIRM, async (userData: UserData, dashboardCallbackRoute: string): Promise<void> => {
  // user register confirm notification !
  if (userData.email !== null) {
    await sendWelcomeEmail(userData.email, dashboardCallbackRoute);
  }
  // in the future we will add send welcome message with sms
});

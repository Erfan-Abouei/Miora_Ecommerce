import { eventEmitter } from '@/config';
import { PublicEventName } from '@/constants';
import type { UserData } from '@/types/modules/v1/user/user-auth/data/user-date.type';

eventEmitter.on(PublicEventName.USER_LOGIN, (_data: UserData): void => {
  // user login notification !z
});

import type { UserData } from '@/types';
import { eventEmitter } from '@/config';
import { PublicEventName } from '@/constants';

eventEmitter.on(PublicEventName.USER_LOGIN, (_data: UserData): void => {
  // user login notification !z
});

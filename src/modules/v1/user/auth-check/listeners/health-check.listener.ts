import type { TokenPayload } from '@/types';
import { eventEmitter } from '@/config';
import { UserEventName } from '@/constants';

eventEmitter.on(UserEventName.USER_AUTH_CHECK, (_token: TokenPayload): void => {
  // request for login status notification !
});

import { eventEmitter } from '@/config';
import { UserEventName } from '@/constants';
import { TokenPayload } from '@/types/common/basic.type';

eventEmitter.on(UserEventName.USER_AUTH_CHECK, (token: TokenPayload): void => {
  // request for login status notification !
});

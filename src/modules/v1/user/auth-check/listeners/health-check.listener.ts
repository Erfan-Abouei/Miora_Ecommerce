import { eventEmitter } from '@/config/emitter/event-emitter.config';
import { UserEventName } from '@/constants/events/USER_EVENTS.constants';
import { TokenPayload } from '@/types/common/basic.type';

eventEmitter.on(UserEventName.USER_LOGIN_STATUS, (token: TokenPayload) => {
  // request for login status notification !
});

import { eventEmitter } from '@/config/emitter/event-emitter.config';
import { PublicEventName } from '@/constants/events/PUBLIC_EVENTS.constants';
import { UserData } from '@/types/modules/v1/user/data/user-date.type';

eventEmitter.on(PublicEventName.USER_LOGIN, (data: UserData) => {
  // user login notification !z
});

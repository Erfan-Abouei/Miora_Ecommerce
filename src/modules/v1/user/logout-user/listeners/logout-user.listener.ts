import { eventEmitter } from '@/config/emitter/event-emitter.config';
import { UserEventName } from '@/constants/events/USER_EVENTS.constants';

eventEmitter.on(UserEventName.USER_LOGOUT, () => {});

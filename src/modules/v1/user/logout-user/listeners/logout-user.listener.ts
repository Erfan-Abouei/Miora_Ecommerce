import { eventEmitter } from '@/config';
import { UserEventName } from '@/constants';

eventEmitter.on(UserEventName.USER_LOGOUT, (): void => {});

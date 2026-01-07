import type { UserData } from '@/types';
import { eventEmitter } from '@/config';
import { UserEventName } from '@/constants';

eventEmitter.on(UserEventName.USER_PROFILE_DATA, (_userData: UserData): void => {});

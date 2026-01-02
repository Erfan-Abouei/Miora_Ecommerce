import type { UserData } from '@/types/modules/v1/user/user-auth/data/user-date.type';
import { eventEmitter } from '@/config';
import { UserEventName } from '@/constants';

eventEmitter.on(UserEventName.USER_PROFILE_DATA, (_userData: UserData): void => {});

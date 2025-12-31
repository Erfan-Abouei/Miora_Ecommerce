import { eventEmitter } from '@/config';
import { PublicEventName } from '@/constants';

eventEmitter.on(PublicEventName.USER_FORGPT_PASSWORD_VERIFIED, () => {});

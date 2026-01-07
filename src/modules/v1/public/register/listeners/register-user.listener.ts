import type { RegisterUserDTO } from '@/types';
import { eventEmitter } from '@/config';
import { PublicEventName } from '@/constants';

eventEmitter.on(PublicEventName.USER_REGISTER, (_aboutRegisterAndOtpData: RegisterUserDTO): void => {
  // user register notification !
});

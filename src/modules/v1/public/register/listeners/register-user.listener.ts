import type { RegisterUserDTO } from '@/types/modules/v1/user/user-auth/dto/user-dto.type';
import { eventEmitter } from '@/config';
import { PublicEventName } from '@/constants';

eventEmitter.on(PublicEventName.USER_REGISTER, (_aboutRegisterAndOtpData: RegisterUserDTO): void => {
  // user register notification !
});

import { eventEmitter } from '@/config';
import { PublicEventName } from '@/constants';
import { RegisterUserDTO } from '@/types/modules/v1/user/user-auth/dto/user-dto.type';

eventEmitter.on(PublicEventName.USER_REGISTER, (aboutRegisterAndOtpData: RegisterUserDTO): void => {
  // user register notification !
});

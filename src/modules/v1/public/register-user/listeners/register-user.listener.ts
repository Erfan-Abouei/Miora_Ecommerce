import { eventEmitter } from '@/config';
import { PublicEventName } from '@/constants';
import { UserData } from '@/types/modules/v1/user/user-auth/data/user-date.type';
import { RegisterUserDTO } from '@/types/modules/v1/user/user-auth/dto/user-dto.type';

eventEmitter.on(PublicEventName.USER_REGISTER, (aboutRegisterAndOtpData: RegisterUserDTO): void => {
  // user register notification !
});

eventEmitter.on(PublicEventName.USER_REGISTER_CONFIRM, (userData: UserData): void => {
  // user register confirm notification !
});

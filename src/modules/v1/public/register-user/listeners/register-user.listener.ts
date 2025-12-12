import { eventEmitter } from '@/config';
import { PublicEventName } from '@/constants';
import { UserData } from '@/types/modules/v1/user/data/user-date.type';
import { RegisterUserDTO } from '@/types/modules/v1/user/dto/user-dto.type';

eventEmitter.on(PublicEventName.USER_REGISTER, (aboutRegisterAndOtpData: RegisterUserDTO) => {
  // user register notification !
});

eventEmitter.on(PublicEventName.USER_REGISTER_CONFIRM, (userData: UserData) => {
  // user register confirm notification !
});

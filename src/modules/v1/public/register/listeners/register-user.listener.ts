import { eventEmitter } from '@/config';
import { PublicEventName } from '@/constants';
import { sendWelcomeEmail } from '@/modules/v1/shared/utils/send-welcome-email.utils';
import { UserData } from '@/types/modules/v1/user/user-auth/data/user-date.type';
import { RegisterUserDTO } from '@/types/modules/v1/user/user-auth/dto/user-dto.type';

eventEmitter.on(PublicEventName.USER_REGISTER, (aboutRegisterAndOtpData: RegisterUserDTO): void => {
  // user register notification !
});

eventEmitter.on(PublicEventName.USER_REGISTER_CONFIRM, async (userData: UserData): Promise<void> => {
  // user register confirm notification !
  await sendWelcomeEmail(userData.email)

});

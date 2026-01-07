import type { UserData, TokenPayload } from '@/types';
import { profileRepository } from '../repositories/';
import { eventEmitter } from '@/config';
import { UserEventName } from '@/constants';

export const profileService = async (userTokenData: TokenPayload): Promise<UserData> => {
  const userData = await profileRepository(userTokenData.userId);
  eventEmitter.emit(UserEventName.USER_PROFILE_DATA, userData);
  return userData as UserData;
};

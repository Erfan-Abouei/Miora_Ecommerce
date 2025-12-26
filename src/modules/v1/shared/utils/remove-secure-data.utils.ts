import { UserData } from '@/types/modules/v1/user/user-auth/data/user-date.type';

export const removeSecureData = (user: UserData) => {
  const { id, role, password, ...unSecureData } = user;
  return unSecureData;
};

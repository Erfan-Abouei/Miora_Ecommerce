import type { UserData } from '@/types/modules/v1/user/user-auth/data/user-date.type';

export const removeSecureData = (user: UserData): Omit<UserData, 'id' | 'role' | 'password'> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, role, password, ...unSecureData } = user;
  return unSecureData;
};

import type { UserData } from '@/types';

export const removeSecureData = (user: UserData): Omit<UserData, 'id' | 'role' | 'password'> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, role, password, ...unSecureData } = user;
  return unSecureData;
};

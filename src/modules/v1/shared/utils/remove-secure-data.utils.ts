import { UserData } from '@/types/modules/v1/user/user-auth/data/user-date.type';

const removeSecureData = (user: UserData) => {
  const { id, role, password, ...unSecureData } = user;
  return unSecureData;
};

export { removeSecureData };

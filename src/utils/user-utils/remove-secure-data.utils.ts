import { User } from '@prisma/client';

const removeSecureData = (user: User) => {
  const { id, role, password, ...unSecureData } = user;
  return unSecureData;
};

export { removeSecureData };

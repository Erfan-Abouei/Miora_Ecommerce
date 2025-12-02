import { User } from '@prisma/client';

const ensureUserExists = (user: User | null): user is User => {
  return user !== null;
};

export { ensureUserExists };

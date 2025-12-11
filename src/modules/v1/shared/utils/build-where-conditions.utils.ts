import { Op } from 'sequelize';

type Credentials = Record<string, any>;

export const buildWhereConditions = (filters: Credentials) => {
  const whereConditions: any[] = [];

  Object.keys(filters).forEach((key) => {
    if (filters[key]) {
      whereConditions.push({ [key]: filters[key] });
    }
  });

  return whereConditions.length > 0 ? { [Op.or]: whereConditions } : {};
};

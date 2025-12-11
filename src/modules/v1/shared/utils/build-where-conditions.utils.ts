import { Op, WhereOptions } from 'sequelize';

type Credentials = Record<string, any>;

export const buildWhereConditions = (filters: Credentials): WhereOptions => {
  const whereConditions: any[] = [];

  Object.keys(filters).forEach((key) => {
    const value = filters[key];
    if (value !== undefined && value !== null) {
      whereConditions.push({ [key]: value });
    }
  });

  return whereConditions.length > 0 ? { [Op.or]: whereConditions } : {};
};

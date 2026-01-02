import type { WhereOptions } from 'sequelize';
import { Op } from 'sequelize';

type Credentials = Record<string, unknown>;

export const buildWhereConditions = (filters: Partial<Credentials>): WhereOptions => {
  const conditions: WhereOptions[] = [];

  for (const [key, value] of Object.entries(filters)) {
    if (value === undefined || value === null) continue;

    const trimmed = typeof value === 'string' ? value.trim() : value;
    if (trimmed === '') continue;

    conditions.push({ [key]: trimmed } as WhereOptions);
  }

  if (conditions.length === 1) {
    return conditions[0];
  }

  return { [Op.or]: conditions };
};
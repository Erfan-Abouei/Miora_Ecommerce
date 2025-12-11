import sequelize from '../database.config';

export const startDatabaseConnection = async (): Promise<void> => {
  await sequelize.authenticate();
};

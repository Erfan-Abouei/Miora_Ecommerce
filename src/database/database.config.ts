import { Sequelize } from 'sequelize';
import { logger } from '@/config';
import { ENV } from '@/config';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: ENV.DATABASE_HOST,
  database: ENV.DATABASE_NAME,
  username: ENV.DATABASE_USER,
  password: ENV.DATABASE_PASSWORD,
  logging: (msg) => logger.debug(msg),
});

export default sequelize;

import { Sequelize } from 'sequelize';
import { logger, ENV } from '@/config';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: ENV.DATABASE_HOST,
  database: ENV.DATABASE_NAME,
  username: ENV.DATABASE_USER,
  password: ENV.DATABASE_PASSWORD,
  logging: ENV.DATABASE_LOGGING ? (msg) => logger.debug(msg) : false,
});

export default sequelize;

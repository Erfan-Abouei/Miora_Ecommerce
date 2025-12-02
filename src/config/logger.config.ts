import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import winston from 'winston';

const logDirectory = path.resolve('logs');
if (!fs.existsSync(logDirectory)) fs.mkdirSync(logDirectory);

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [new winston.transports.File({ filename: path.join(logDirectory, 'error.log'), level: 'error' }), new winston.transports.File({ filename: path.join(logDirectory, 'combined.log') })],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

const httpLogger = morgan('dev', {
  stream: {
    write: (message: string) => logger.info(message.trim()),
  },
});

export { logger, httpLogger };

import { ENV } from '@/config';
import { createClient } from 'redis';

const cache = createClient({
  username: ENV.REDIS_USERNAME,
  password: ENV.REDIS_PASSWORD,
  socket: {
    host: ENV.REDIS_HOST,
    port: ENV.REDIS_PORT,
  },
});
export default cache;

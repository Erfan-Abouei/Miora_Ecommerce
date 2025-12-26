import { ENV } from '@/config';
import { createClient } from 'redis';

const cache = createClient({
  url: ENV.REDIS_URL
});
export default cache;

import NodeCache from 'node-cache';
import { ENV } from '@/config';

const cache = new NodeCache({ stdTTL: ENV.CACHE_TTL, checkperiod: ENV.CACHE_PERIOD });

export default cache;

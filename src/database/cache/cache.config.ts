import { ENV } from '@/config';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: ENV.CACHE_TTL, checkperiod: ENV.CACHE_PERIOD });

export default cache;

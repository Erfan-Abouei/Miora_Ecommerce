import path from 'path';
import fs from 'fs';
import { ENV } from '../env/env.config';

const isProdction = ENV.NODE_ENV === 'production';
export const swaggerDocument = JSON.parse(fs.readFileSync(path.join(process.cwd(), `${isProdction ? '' : 'src'}/config/swagger/base-routes.json`), 'utf8'));

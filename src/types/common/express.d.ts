import 'express';
import { TokenPayload } from '@/types/basic-type/basic.type';

declare module 'express-serve-static-core' {
  interface Request {
    user?: TokenPayload;
  }
}

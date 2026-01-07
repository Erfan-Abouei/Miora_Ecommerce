import { TokenPayload } from './basic.type';
import 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: TokenPayload;
  }
}

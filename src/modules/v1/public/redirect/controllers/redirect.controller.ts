import type { Request, Response, NextFunction } from 'express';
import type { RedirectQueryType } from '@/types/modules/v1/public/health-check/query/redirect-query.type';

export const redirectController = (req: Request<unknown, unknown, unknown, RedirectQueryType>, res: Response, next: NextFunction): void => {
  try {
    const { redirect_url } = req.query;
    res.redirect(redirect_url);
  } catch (error: unknown) {
    next(error);
  }
};

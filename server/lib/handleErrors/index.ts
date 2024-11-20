import { NextFunction, Request, Response } from 'express';

export function handleErrors(fn: (...args: any[]) => Promise<any> | void) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await fn(req, res);
    } catch (x) {
      return next(x);
    }
  };
}

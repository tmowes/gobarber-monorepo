import { Request, Response, NextFunction } from 'express'

export type ExpressMiddlewares = (
  request: Request,
  response: Response,
  next: NextFunction,
) => Promise<void> | void

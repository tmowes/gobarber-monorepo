import { Request, Response } from 'express'
import AppError from '../exceptions/AppError'

export default function generalException(
  err: Error,
  _request: Request,
  response: Response,
) {
  if (err instanceof AppError) {
    return response.status(err.status).json({
      status: err.status,
      message: err.message,
    })
  }
  // eslint-disable-next-line no-console
  console.error(err)
  return response.status(500).json({
    status: 500,
    message: 'Internal server error',
  })
}

import { ExpressErrorMiddleware } from '../@types/middlewares'
import AppError from '../exceptions/AppError'

const generalException: ExpressErrorMiddleware = (
  error,
  request,
  response,
  _next,
) => {
  if (error instanceof AppError) {
    return response.status(error.status).json({
      status: error.status,
      message: error.message,
    })
  }
  // eslint-disable-next-line no-console
  console.error(error)
  return response.status(500).json({
    status: 500,
    message: request.t('internal_server_error'),
  })
}

export default generalException

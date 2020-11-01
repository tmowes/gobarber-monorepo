/* eslint-disable  */
import { verify } from 'jsonwebtoken'
import { ExpressMiddlewares } from '../@types/middlewares'
import authConfig from '../config/auth'
import AppError from '../exceptions/AppError'
import { TokenPayload } from './types'

const ensureAuthenticated: ExpressMiddlewares = (request, _, next) => {
  const authHeader = request.headers.authorization
  if (!authHeader) {
    throw new AppError(request.t('missing_auth_token'), 401)
  }
  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, authConfig.jwt.secret, {
      algorithms: ['HS256'],
    })
    const { sub } = decoded as TokenPayload
    request.user = {
      id: sub,
    }
    return next()
  } catch (err) {
    throw new AppError(request.t('invalid_token'), 401)
  }
}

export default ensureAuthenticated

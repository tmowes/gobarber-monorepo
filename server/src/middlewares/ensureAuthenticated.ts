/* eslint-disable  */
import { verify } from 'jsonwebtoken'
import { ExpressMiddlewares } from '../@types/middlewares'
import authConfig from '../config/auth'
import AppError from '../errors/AppError'
import { TokenPayload } from './types'

const ensureAuthenticated: ExpressMiddlewares = (request, _, next) => {
  const authHeader = request.headers.authorization
  if (!authHeader) {
    throw new AppError('JWT token is missing', 401)
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
    throw new AppError('Invalid JWT token', 401)
  }
}

export default ensureAuthenticated

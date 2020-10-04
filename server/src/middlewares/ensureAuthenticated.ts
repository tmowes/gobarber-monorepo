/* eslint-disable  */
import { verify } from 'jsonwebtoken'
import { ExpressMiddlewares } from '../@types/middlewares'
import authConfig from '../config/auth'
import { TokenPayload } from './types'

const ensureAuthenticated: ExpressMiddlewares = (request, response, next) => {
  const authHeader = request.headers.authorization
  if (!authHeader) {
    throw new Error('JWT token is missing')
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
    throw new Error('Invalid JWT token')
  }
}

export default ensureAuthenticated

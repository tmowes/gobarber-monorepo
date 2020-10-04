import { Router } from 'express'
import { classToClass } from 'class-transformer'

import AuthenticateUserService from '../../services/AuthenticateUserService'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body

    const authenticateUser = new AuthenticateUserService()

    const session = await authenticateUser.execute({ email, password })
    return response.json(classToClass(session))
  } catch (err) {
    return response.status(400).json({ message: err.message })
  }
})

export default sessionsRouter

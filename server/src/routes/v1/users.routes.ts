import { Router } from 'express'
import { classToClass } from 'class-transformer'
import CreateUserService from '../../services/CreateUserService'

const usersRoutes = Router()

usersRoutes.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body

    const createUser = new CreateUserService()

    const user = await createUser.execute({ name, email, password })
    return response.json(classToClass(user))
  } catch (err) {
    return response.status(400).json({ message: err.message })
  }
})

export default usersRoutes

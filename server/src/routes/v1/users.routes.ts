import { Router } from 'express'
import { classToClass } from 'class-transformer'
import multer from 'multer'
import CreateUserService from '../../services/CreateUserService'
import ensureAuthenticated from '../../middlewares/ensureAuthenticated'
import uploadConfig from '../../config/upload'

const usersRoutes = Router()
const upload = multer(uploadConfig)

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

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    console.log(request.file)
    return response.json({ message: 'ok' })
  },
)

export default usersRoutes

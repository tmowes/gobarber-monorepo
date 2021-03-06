import { Router } from 'express'
import { classToClass } from 'class-transformer'
import multer from 'multer'
import CreateUserService from '../../services/CreateUserService'
import ensureAuthenticated from '../../middlewares/ensureAuthenticated'
import uploadConfig from '../../config/upload'
import UpdateUserAvatarService from '../../services/UpdateUserAvatarService'

const usersRoutes = Router()
const upload = multer(uploadConfig)

usersRoutes.post('/', async (request, response) => {
  const { name, email, password } = request.body

  const createUser = new CreateUserService(request.t)

  const user = await createUser.execute({ name, email, password })

  return response.json(classToClass(user))
})

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const { user, file } = request

    const updateUserAvatar = new UpdateUserAvatarService(request.t)

    const updatedUser = await updateUserAvatar.execute({
      user_id: user.id,
      filename: file.filename,
    })

    return response.json(classToClass(updatedUser))
  },
)

export default usersRoutes

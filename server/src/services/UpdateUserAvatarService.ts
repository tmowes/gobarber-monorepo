import path from 'path'
import fs from 'fs'
import { getCustomRepository } from 'typeorm'

import User from '../models/User'
import UsersRepository from '../repositories/UsersRepository'
import uploadConfig from '../config/upload'
import AppError from '../errors/AppError'

interface RequestDTO {
  user_id: string
  filename: string
}

export default class UpdateUserAvatarService {
  public async execute({ user_id, filename }: RequestDTO): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository)
    const user = await usersRepository.findOne(user_id)
    if (!user) {
      throw new AppError('User is not registered', 401)
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = filename
    await usersRepository.save(user)
    return user
  }
}

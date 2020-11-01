import path from 'path'
import fs from 'fs'
import { getCustomRepository } from 'typeorm'

import User from '../models/User'
import UsersRepository from '../repositories/UsersRepository'
import uploadConfig from '../config/upload'
import AppError from '../exceptions/AppError'
import BaseService from '../common/base.services'

interface RequestDTO {
  user_id: string
  filename: string
}

export default class UpdateUserAvatarService extends BaseService {
  public async execute({ user_id, filename }: RequestDTO): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository)
    const user = await usersRepository.findOne(user_id)
    if (!user) {
      throw new AppError(this.t('user_not_registered'))
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

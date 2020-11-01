import { getCustomRepository } from 'typeorm'
import { hash } from 'bcryptjs'

import User from '../models/User'
import UsersRepository from '../repositories/UsersRepository'
import AppError from '../exceptions/AppError'
import BaseService from '../common/base.services'

interface RequestDTO {
  name: string
  email: string
  password: string
}

export default class CreateUserService extends BaseService {
  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository)
    const findUserInSameEmail = await usersRepository.findByEmail(email)
    if (findUserInSameEmail) {
      throw new AppError(this.t('email_already_registered'))
    }
    const hashedPassword = await hash(password, 8)
    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })
    await usersRepository.save(user)
    return user
  }
}

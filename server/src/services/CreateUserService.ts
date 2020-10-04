import { getCustomRepository } from 'typeorm'
import { hash } from 'bcryptjs'

import User from '../models/User'
import UsersRepository from '../repositories/UsersRepository'

interface RequestDTO {
  name: string
  email: string
  password: string
}

export default class CreateUserService {
  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository)
    const findUserInSameEmail = await usersRepository.findByEmail(email)
    if (findUserInSameEmail) {
      throw new Error('E-mail already exists')
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

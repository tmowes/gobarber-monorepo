import { getCustomRepository } from 'typeorm'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcryptjs'

import authConfig from '../config/auth'
import User from '../models/User'
import UsersRepository from '../repositories/UsersRepository'

interface RequestDTO {
  email: string
  password: string
}

interface IResponseDTO {
  user: User
  token: string
}

export default class AuthenticateUserService {
  public async execute({ email, password }: RequestDTO): Promise<IResponseDTO> {
    const usersRepository = getCustomRepository(UsersRepository)

    const user = await usersRepository.findByEmail(email)
    if (!user) {
      throw new Error('Incorrect email/password combination')
    }
    const passwordMatched = await compare(password, user.password)
    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination')
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    })
    return { user, token }
  }
}
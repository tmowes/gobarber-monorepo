import { EntityRepository, Repository } from 'typeorm'
import User from '../models/User'

@EntityRepository(User)
export default class UsersRepository extends Repository<User> {
  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.findOne({
      where: { email },
    })
    return findUser
  }
}

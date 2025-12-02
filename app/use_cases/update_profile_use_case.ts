import UserRepository from '#repositories/user_repository'
import User from '#models/user'

export default class UpdateProfileUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private userRepo: UserRepository) { }

  async execute(user: User, data: any) {
    return await this.userRepo.update(user, data)
  }
}

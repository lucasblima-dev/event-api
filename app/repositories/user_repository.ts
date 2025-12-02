import User from '#models/user'

export default class UserRepository {
  async create(data: Partial<User>) {
    return await User.create(data)
  }

  async findByEmail(email: string) {
    return await User.findBy('email', email)
  }

  async findById(id: number) {
    return await User.find(id)
  }

  async update(user: User, data: Partial<User>) {
    user.merge(data)
    return await user.save()
  }
}

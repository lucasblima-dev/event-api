import UserRepository from '#repositories/user_repository'
import User from '#models/user'

export default class RegisterUserUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private userRepo: UserRepository) { }

  async execute(data: any): Promise<User> {
    if (data.role === 'PARTICIPANTE' && !data.cpf) {
      throw new Error('CPF é obrigatório para participantes.')
    }

    const userExists = await this.userRepo.findByEmail(data.email)
    if (userExists) {
      throw new Error('Usuário já existe.')
    }

    return await this.userRepo.create(data)
  }
}

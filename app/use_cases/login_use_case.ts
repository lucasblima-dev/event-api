import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class LoginUseCase {
  async execute(email: string, passwordPlain: string) {
    const user = await User.findBy('email', email)
    if (!user) {
      throw new Error('Credenciais Inválidas')
    }

    const isValid = await hash.verify(user.password, passwordPlain)

    console.log('Resultado da comparação:', isValid)

    if (!isValid) {
      throw new Error('Credenciais Inválidas')
    }

    const token = await User.accessTokens.create(user, ['*'], {
      expiresIn: '30 days',
    })

    return {
      token: token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    }
  }
}

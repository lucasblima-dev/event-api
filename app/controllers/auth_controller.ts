import type { HttpContext } from '@adonisjs/core/http'
import UserRepository from '#repositories/user_repository'
import RegisterUserUseCase from '#use_cases/register_user_use_case'
import LoginUseCase from '#use_cases/login_use_case'
import { registerValidator, loginValidator } from '#validators/auth'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const data = await request.validateUsing(registerValidator)

    const userRepo = new UserRepository()
    const useCase = new RegisterUserUseCase(userRepo)

    try {
      const user = await useCase.execute(data)
      return response.created(user)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const useCase = new LoginUseCase()

    try {
      const result = await useCase.execute(email, password)
      return response.ok(result)
    } catch (error) {
      console.log('Erro no login:', error.message)
    }
  }
}

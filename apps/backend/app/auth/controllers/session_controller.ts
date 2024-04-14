import { registerUserValidator } from '#auth/validators/register_validator'
import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async register({ auth, request, response }: HttpContext) {
    const payload = await request.validateUsing(registerUserValidator)
    const user = await User.create(payload)

    await auth.use('web').login(user)
    return response.noContent()
  }

  async login({ auth, request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)
    return response.noContent()
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.noContent()
  }
}

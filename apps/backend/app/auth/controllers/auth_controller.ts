import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async me({ auth, response }: HttpContext) {
    return response.ok(auth.user)
  }
}

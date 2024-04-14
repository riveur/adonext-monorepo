import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#auth/controllers/auth_controller')
const SessionController = () => import('#auth/controllers/session_controller')

router
  .group(() => {
    router.post('login', [SessionController, 'login'])
    router.put('register', [SessionController, 'register'])
  })
  .middleware(middleware.guest())
router
  .group(() => {
    router.get('me', [AuthController, 'me'])
    router.delete('logout', [SessionController, 'logout'])
  })
  .middleware(middleware.auth())

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#auth/controllers/auth_controller')
const SessionController = () => import('#auth/controllers/session_controller')
const TodosController = () => import('#todo/controllers/todos_controller')

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
router
  .group(() => {
    router.get('todos', [TodosController, 'index'])
    router.post('todos', [TodosController, 'store'])
    router.get('todos/:id', [TodosController, 'show'])
    router.put('todos/:id', [TodosController, 'update'])
    router.delete('todos/:id', [TodosController, 'destroy'])
  })
  .middleware(middleware.auth())

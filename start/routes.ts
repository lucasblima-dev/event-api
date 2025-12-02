import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
const ParticipantsController = () => import('#controllers/participants_controller')

router.get('/', async () => {
  return { hello: 'world' }
})

router.post('register', [AuthController, 'register'])
router.post('login', [AuthController, 'login'])

router
  .group(() => {
    router.put('participant/profile', [ParticipantsController, 'update'])
    router.get('participant/events', [ParticipantsController, 'indexMyEvents'])
    router.delete('participant/events/:id', [ParticipantsController, 'cancelSubscription'])
  })
  .use(middleware.auth())

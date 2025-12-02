import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
const ParticipantsController = () => import('#controllers/participants_controller')
const EventsController = () => import('#controllers/events_controller')

router.get('/', async () => {
  return { hello: 'world' }
})

router.post('register', [AuthController, 'register'])
router.post('login', [AuthController, 'login'])

router
  .group(() => {
    //Participante
    router.put('participant/profile', [ParticipantsController, 'update'])
    router.get('participant/events', [ParticipantsController, 'indexMyEvents'])
    router.delete('participant/events/:id', [ParticipantsController, 'cancelSubscription'])

    //Organizador
    router.post('events', [EventsController, 'create'])
    router.get('organizer/events', [EventsController, 'indexMyEvents'])
    router.put('events/:id', [EventsController, 'update'])
    router.delete('events/:id', [EventsController, 'destroy'])
  })
  .use(middleware.auth())

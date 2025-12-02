import type { HttpContext } from '@adonisjs/core/http'
import UserRepository from '#repositories/user_repository'
import EventRepository from '#repositories/event_repository'
import UpdateProfileUseCase from '#use_cases/update_profile_use_case'
import ListParticipantEventsUseCase from '#use_cases/list_participant_events_use_case'
import CancelSubscriptionUseCase from '#use_cases/cancel_subscription_use_case'
import { updateProfileValidator } from '#validators/participant'

export default class ParticipantsController {
  async update({ request, auth, response }: HttpContext) {
    const data = await request.validateUsing(updateProfileValidator)
    const user = auth.user!

    const userRepo = new UserRepository()
    const useCase = new UpdateProfileUseCase(userRepo)

    try {
      const updatedUser = await useCase.execute(user, data)
      return response.ok(updatedUser)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  async indexMyEvents({ auth, response }: HttpContext) {
    const user = auth.user!

    const eventRepo = new EventRepository()
    const useCase = new ListParticipantEventsUseCase(eventRepo)

    try {
      const events = await useCase.execute(user)
      return response.ok(events)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  async cancelSubscription({ params, auth, response }: HttpContext) {
    const eventId = params.id
    const user = auth.user!

    const eventRepo = new EventRepository()
    const useCase = new CancelSubscriptionUseCase(eventRepo)

    try {
      const result = await useCase.execute(user.id, eventId)
      return response.ok(result)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }
}

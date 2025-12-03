import type { HttpContext } from '@adonisjs/core/http'
import EventRepository from '#repositories/event_repository'
import CreateEventUseCase from '#use_cases/create_event_use_case'
import ListOrganizerEventsUseCase from '#use_cases/list_organizer_events_use_case'
import UpdateEventUseCase from '#use_cases/update_event_use_case'
import DeleteEventUseCase from '#use_cases/delete_event_use_case'
import { createEventValidator, updateEventValidator } from '#validators/event'
import RegisterParticipantUseCase from '#use_cases/register_participant_use_case'
import ListEventParticipantsUseCase from '#use_cases/list_event_participants_use_case'

export default class EventsController {
  async create({ request, auth, response }: HttpContext) {
    const data = await request.validateUsing(createEventValidator)
    const user = auth.user!

    const eventRepo = new EventRepository()
    const useCase = new CreateEventUseCase(eventRepo)

    try {
      const event = await useCase.execute(data, user)
      return response.created(event)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  async indexMyEvents({ auth, response }: HttpContext) {
    const user = auth.user!

    const eventRepo = new EventRepository()
    const useCase = new ListOrganizerEventsUseCase(eventRepo)

    try {
      const events = await useCase.execute(user)
      return response.ok(events)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  async update({ params, request, auth, response }: HttpContext) {
    const data = await request.validateUsing(updateEventValidator)
    const user = auth.user!
    const eventId = params.id

    const eventRepo = new EventRepository()
    const useCase = new UpdateEventUseCase(eventRepo)

    try {
      const updatedEvent = await useCase.execute(eventId, data, user)
      return response.ok(updatedEvent)
    } catch (error) {
      // Checar depois se é ideal ser 403 aqui
      return response.badRequest({ message: error.message })
    }
  }

  async destroy({ params, auth, response }: HttpContext) {
    const user = auth.user!
    const eventId = params.id

    const eventRepo = new EventRepository()
    const useCase = new DeleteEventUseCase(eventRepo)

    try {
      const result = await useCase.execute(eventId, user)
      return response.ok(result)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  async register({ params, auth, response }: HttpContext) {
    const user = auth.user!
    const eventId = params.id

    const eventRepo = new EventRepository()
    const useCase = new RegisterParticipantUseCase(eventRepo)

    try {
      const result = await useCase.execute(user, eventId)
      return response.created(result)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  async index({ response }: HttpContext) {
    const eventRepo = new EventRepository()
    const events = await eventRepo.findAll()
    return response.ok(events)
  }

  async participants({ params, auth, response }: HttpContext) {
    const user = auth.user!
    const eventId = params.id

    const eventRepo = new EventRepository()
    const useCase = new ListEventParticipantsUseCase(eventRepo)

    try {
      const participants = await useCase.execute(eventId, user)
      return response.ok(participants)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }
}

import Event from '#models/event'
import User from '#models/user'

export default class EventRepository {
  async create(data: Partial<Event>) {
    return await Event.create(data)
  }

  async findById(id: number) {
    return await Event.find(id)
  }

  async getEventsByOrganizer() {
    return await Event.all()
  }

  async findAll() {
    return await Event.query().preload('organizer')
  }

  async getParticipants(event: Event) {
    return await event.related('participants').query()
  }

  async addParticipant(event: Event, userId: number) {
    await event.related('participants').attach([userId])
  }

  async countParticipants(event: Event) {
    const result = await event.related('participants').query().count('* as total')
    return Number(result[0].$extras.total)
  }

  async getEventsByParticipant(user: User) {
    return await user.related('events').query()
  }

  async removeParticipant(event: Event, userId: number) {
    await event.related('participants').detach([userId])
  }
}

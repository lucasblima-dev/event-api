import Event from '#models/event'

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

  async addParticipant(event: Event, userId: number) {
    await event.related('participants').attach([userId])
  }

  async countParticipants(event: Event) {
    const result = await event.related('participants').query().count('* as total')
    return Number(result[0].$extras.total)
  }
}

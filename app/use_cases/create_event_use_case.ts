import EventRepository from '#repositories/event_repository'
import User from '#models/user'

export default class CreateEventUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private eventRepo: EventRepository) { }

  async execute(data: any, user: User) {
    if (user.role !== 'ORGANIZADOR') {
      throw new Error('Apenas organizadores podem criar eventos.')
    }

    const eventData = {
      ...data,
      organizadorId: user.id,
    }

    return await this.eventRepo.create(eventData)
  }
}

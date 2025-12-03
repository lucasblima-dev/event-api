import EventRepository from '#repositories/event_repository'
import User from '#models/user'

export default class ListOrganizerEventsUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private eventRepo: EventRepository) { }

  async execute(user: User) {
    if (user.role !== 'ORGANIZADOR') {
      throw new Error('Apenas organizadores podem listar seus eventos.')
    }

    return await this.eventRepo.getEventsByOrganizer(user.id)
  }
}

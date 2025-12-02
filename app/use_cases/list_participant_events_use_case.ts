import EventRepository from '#repositories/event_repository'
import User from '#models/user'

export default class ListParticipantEventsUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private eventRepo: EventRepository) { }

  async execute(user: User) {
    if (user.role !== 'PARTICIPANTE') {
      throw new Error('Apenas participantes possuem inscrições.')
    }

    return await this.eventRepo.getEventsByParticipant(user)
  }
}

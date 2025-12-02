import EventRepository from '#repositories/event_repository'
//import User from '#models/user'

export default class CancelSubscriptionUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private eventRepo: EventRepository) { }

  async execute(userId: number, eventId: number) {
    const event = await this.eventRepo.findById(eventId)

    if (!event) {
      throw new Error('Evento não encontrado.')
    }

    await this.eventRepo.removeParticipant(event, userId)

    return { message: 'Inscrição cancelada com sucesso.' }
  }
}

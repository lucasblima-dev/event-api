import EventRepository from '#repositories/event_repository'
import User from '#models/user'

export default class UpdateEventUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private eventRepo: EventRepository) { }

  async execute(eventId: number, data: any, user: User) {
    const event = await this.eventRepo.findById(eventId)

    if (!event) {
      throw new Error('Evento não encontrado.')
    }

    if (event.organizadorId !== user.id) {
      throw new Error('Você não tem permissão para editar este evento.')
    }

    event.merge(data)
    return await event.save()
  }
}

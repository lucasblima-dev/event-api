import EventRepository from '#repositories/event_repository'
import User from '#models/user'

export default class DeleteEventUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private eventRepo: EventRepository) { }

  async execute(eventId: number, user: User) {
    const event = await this.eventRepo.findById(eventId)

    if (!event) {
      throw new Error('Evento não encontrado.')
    }

    if (event.organizadorId !== user.id) {
      throw new Error('Você não tem permissão para excluir este evento.')
    }

    await event.delete()
    return { message: 'Evento excluído com sucesso.' }
  }
}

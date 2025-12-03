import EventRepository from '#repositories/event_repository'
import User from '#models/user'

export default class RegisterParticipantUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private eventRepo: EventRepository) { }

  async execute(user: User, eventId: number) {
    const event = await this.eventRepo.findById(eventId)

    if (!event) throw new Error('Evento não encontrado.')

    const alreadyRegistered = await user
      .related('events')
      .query()
      .where('event_id', event.id)
      .first()

    if (alreadyRegistered) throw new Error('Você já está inscrito neste evento.')

    const hasTimeConflict = await user
      .related('events')
      .query()
      .where('date', event.date.toSQL()!)
      .first()

    if (hasTimeConflict) throw new Error('Você já tem um evento agendado para este horário.')

    const currentParticipants = await this.eventRepo.countParticipants(event)

    if (currentParticipants >= event.capacidadeMax) {
      throw new Error('Evento lotado! Não há mais vagas disponíveis.')
    }

    await this.eventRepo.addParticipant(event, user.id)

    return { message: 'Inscrição realizada com sucesso!' }
  }
}

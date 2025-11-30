import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column.dateTime()
  declare date: DateTime

  @column()
  declare location: string

  @column()
  declare capacidadeMax: number

  @column()
  declare organizadorId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, { foreignKey: 'organizadorId' })
  declare organizer: BelongsTo<typeof User>

  @manyToMany(() => User, {
    pivotTable: 'event_user',
    pivotTimestamps: true,
  })
  declare participants: ManyToMany<typeof User>
}

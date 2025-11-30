import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Event from '#models/event'

const AuthUser = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthUser) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome_completo: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare cpf: string | null

  @column()
  declare papel: 'ORGANIZADOR' | 'PARTICIPANTE'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Event, { foreignKey: 'organizadorId' })
  declare organizedEvents: HasMany<typeof Event>

  @manyToMany(() => Event, {
    pivotTable: 'event_user',
    pivotTimestamps: true,
  })
  declare events: ManyToMany<typeof Event>
}

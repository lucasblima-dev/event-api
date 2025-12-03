import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export const createEventValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(3),
    // Conversão do formato DAte do JS para o DateTime do Lucid
    date: vine
      .date({ formats: ['YYYY-MM-DD HH:mm:ss', 'ISO8601'] })
      .transform((date) => DateTime.fromJSDate(date)),

    capacidadeMax: vine.number().min(1),

    location: vine.string().trim().minLength(3),
  })
)

export const updateEventValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(3).optional(),

    date: vine
      .date({ formats: ['YYYY-MM-DD HH:mm:ss', 'ISO8601'] })
      .transform((date) => DateTime.fromJSDate(date))
      .optional(),

    location: vine.string().optional(),
    capacidadeMax: vine.number().min(1).optional(),
  })
)

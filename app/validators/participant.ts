import vine from '@vinejs/vine'

export const updateProfileValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(3).optional(),
    password: vine.string().minLength(6).optional(),
  })
)

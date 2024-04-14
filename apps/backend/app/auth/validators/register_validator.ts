import vine from '@vinejs/vine'

export const registerUserValidator = vine.compile(
  vine.object({
    full_name: vine.string().trim(),
    email: vine.string().trim().email(),
    password: vine.string().confirmed(),
  })
)

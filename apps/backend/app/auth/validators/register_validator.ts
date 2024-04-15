import vine from '@vinejs/vine'

export const registerUserValidator = vine.compile(
  vine.object({
    username: vine.string().trim(),
    email: vine.string().trim().email(),
    password: vine.string().confirmed(),
  })
)

import vine from '@vinejs/vine'

export const storeTodoValidator = vine.compile(
  vine.object({
    content: vine.string().trim(),
  })
)

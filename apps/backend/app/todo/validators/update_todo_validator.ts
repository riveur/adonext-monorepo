import vine from '@vinejs/vine'

export const updateTodoValidator = vine.compile(
  vine.object({
    content: vine.string().trim().optional(),
    completed: vine.boolean().optional(),
  })
)

import factory from '@adonisjs/lucid/factories'
import Todo from '#models/todo'

export const TodoFactory = factory
  .define(Todo, async ({ faker }) => {
    return {
      content: faker.word.words({ count: { min: 3, max: 5 } }),
    }
  })
  .build()

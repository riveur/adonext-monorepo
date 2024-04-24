import { TodoFactory } from '#database/factories/todo_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    TodoFactory.createMany(50)
  }
}

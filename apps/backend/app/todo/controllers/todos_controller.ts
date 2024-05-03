import Todo from '#models/todo'
import { PaginationService } from '#services/pagination_service'
import { storeTodoValidator } from '#todo/validators/store_todo_validator'
import { updateTodoValidator } from '#todo/validators/update_todo_validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

export default class TodosController {
  @inject()
  async index({ response }: HttpContext, paginationService: PaginationService) {
    return response.ok(await paginationService.paginate(Todo))
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(storeTodoValidator)
    const todo = await Todo.create(payload)
    await todo.refresh()
    return response.created(todo)
  }

  async show({ params, response }: HttpContext) {
    const todo = await Todo.findOrFail(params.id)
    return response.ok(todo)
  }

  async update({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(updateTodoValidator)
    const todo = await Todo.findOrFail(params.id)
    todo.merge(payload)
    await todo.save()
    return response.ok(todo)
  }

  async destroy({ params, response }: HttpContext) {
    const todo = await Todo.findOrFail(params.id)
    await todo.delete()
    return response.noContent()
  }
}

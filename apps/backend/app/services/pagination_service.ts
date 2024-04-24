import { paginationValidator } from '#validators/pagination_validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { LucidModel } from '@adonisjs/lucid/types/model'

@inject()
export class PaginationService {
  constructor(private ctx: HttpContext) {}

  protected async parseSearchParams(searchParams: Record<string, string>) {
    return paginationValidator.validate(searchParams)
  }

  protected parseSortParam(param: string) {
    const [field, direction] = param.split('.')
    if (!['asc', 'desc'].includes(direction)) {
      throw new Error('Invalid sort direction')
    }
    return { field, direction: direction as 'asc' | 'desc' }
  }

  async paginate<T extends LucidModel>(model: T) {
    const { page, limit, sort } = await this.parseSearchParams(this.ctx.request.qs())

    let query = model.query()

    if (sort) {
      const parsedSort = this.parseSortParam(sort)
      if (!model.$hasColumn(parsedSort.field)) {
        throw new Error('Invalid sort field')
      }
      query = query.orderBy(parsedSort.field, parsedSort.direction)
    }

    if (page && limit) {
      return query.paginate(page, limit)
    }

    return query
  }
}

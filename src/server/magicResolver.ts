import { Args, Query, Resolver } from '@nestjs/graphql'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { WithID } from './WithID'

export function magicResolver<T extends WithID>(EntityClass: new () => T): any {
  @Resolver(() => EntityClass)
  class MagicResolver {
    constructor(
      @InjectRepository(EntityClass)
      private repository: Repository<WithID>,
    ) {}

    @Query(() => EntityClass)
    async autoEntity(@Args('id', { type: () => Number }) id: number) {
      return this.repository.findOneBy({ id })
    }
  }

  return MagicResolver
}

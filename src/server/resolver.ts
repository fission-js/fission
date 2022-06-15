import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { inputTypeWithId, inputTypeWithoutId } from './input-type'
import { EntityClass as EntityClassType, EntityIdType } from '../common'
import { BadRequestException } from '@nestjs/common'

//TODO получать тип идентификатора, использовать его в декораторе аргумента

export function resolver<T extends EntityIdType = number>(
  EntityClass: EntityClassType<T>,
): any {
  const EntityInputTypeWithId = inputTypeWithId(EntityClass)
  const EntityInputTypeWithoutId = inputTypeWithoutId(EntityClass)

  @Resolver(() => EntityClass)
  class MagicResolver {
    constructor(
      @InjectRepository(EntityClass)
      private repository: Repository<EntityClassType<T>>,
    ) {}

    @Query(() => EntityClass, { name: `get${EntityClass.name}ById` })
    async getEntityById(@Args('id', { type: () => Number }) id: T) {
      return this.repository.findOneByOrFail({ id })
    }

    @Query(() => [EntityClass], { name: `get${EntityClass.name}ByIds` })
    async getEntityByIds(@Args('ids', { type: () => Number }) ids: T[]) {
      return this.repository.findBy({ id: In(ids) })
    }

    @Query(() => [EntityClass], { name: `get${EntityClass.name}List` })
    async getEntityList() {
      return this.repository.find()
    }

    @Mutation(() => EntityClass, { name: `create${EntityClass.name}` })
    async createEntity(
      @Args('data', { type: () => EntityInputTypeWithoutId })
      data: Partial<Omit<T, 'id'>>,
    ) {
      const { repository } = this
      const entity = repository.create(data)
      await repository.save(entity)
      return entity
    }

    @Mutation(() => [EntityClass], {
      name: `createMultiple${EntityClass.name}`,
    })
    async createMultipleEntities(
      @Args('entities', { type: () => [EntityInputTypeWithoutId] })
      entitiesData: Partial<Omit<T, 'id'>>[],
    ) {
      const { repository } = this
      const { identifiers } = await repository.upsert(entitiesData, [])
      return await repository.findBy({ id: identifiers })
    }

    @Mutation(() => EntityClass, { name: `update${EntityClass.name}` })
    async updateEntity(
      @Args('id', { type: () => Number }) id: T,
      @Args('data', { type: () => EntityInputTypeWithoutId })
      data: Partial<Omit<T, 'id'>>,
    ) {
      const { repository } = this
      await repository.update({ id }, data)
      return await repository.findOneByOrFail({ id })
    }

    @Mutation(() => EntityClass, { name: `updateMultiple${EntityClass.name}` })
    async updateEntities(
      @Args('entities', { type: () => [EntityInputTypeWithId] })
      entities: (Partial<T> & { id: T })[],
    ) {
      const { repository } = this
      entities.map(({ id, ...data }) =>
        Object.assign(repository.findOneByOrFail(id), data),
      )
      await Promise.all(entities.map((entity) => repository.save(entity)))
      return entities
    }

    @Mutation(() => Boolean, { name: `delete${EntityClass.name}` })
    async deleteEntity(
      @Args('id', { type: () => Number, nullable: true }) id: T,
      @Args('ids', { type: () => Number, nullable: true }) ids: T[],
    ) {
      if (!(id && ids))
        throw new BadRequestException('Either id or ids must be specified')

      await this.repository.delete({ id: id || ids })
      return true
    }
  }

  return MagicResolver
}

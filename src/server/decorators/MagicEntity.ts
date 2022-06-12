import { Entity } from 'typeorm'
import { ObjectType, InputType } from '@nestjs/graphql'
import { applyDecorators } from '@nestjs/common'
import { MagicEntityOptions } from 'common/decorators/MagicEntity'
import { EntityClass, EntityIdType } from 'common/EntityType'

export const MagicEntity = <T extends EntityIdType = number>(
  options?: MagicEntityOptions,
) => {
  return applyDecorators(
    (target: EntityClass<T>) => {
      InputType(`${target.name}Input`, options)
    },
    Entity(options),
    ObjectType(options),
  )
}

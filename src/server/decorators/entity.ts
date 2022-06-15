import { Entity as OrmEntity } from 'typeorm'
import { ObjectType, InputType } from '@nestjs/graphql'
import { applyDecorators } from '@nestjs/common'
import { EntityOptions, EntityClass, EntityIdType } from '../../common'

export const Entity = <T extends EntityIdType = number>(
  options?: EntityOptions,
) => {
  return applyDecorators(OrmEntity(options), ObjectType(options))
}

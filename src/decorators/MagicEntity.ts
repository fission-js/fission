import { applyDecorators } from '@nestjs/common'
import { Entity, EntityOptions } from 'typeorm'
import { ObjectType, ObjectTypeOptions } from '@nestjs/graphql'

export const MagicEntity = (options?: EntityOptions & ObjectTypeOptions) => {
  return applyDecorators(Entity(options), ObjectType(options))
}

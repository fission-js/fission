import { Entity } from 'typeorm'
import { ObjectType } from '@nestjs/graphql'
import { applyDecorators } from '@nestjs/common'
import { MagicEntityOptions } from 'common/decorators/MagicEntity'

export const MagicEntity = (options?: MagicEntityOptions) => {
  return applyDecorators(Entity(options), ObjectType(options))
}

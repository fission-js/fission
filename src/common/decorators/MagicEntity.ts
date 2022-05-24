import { EntityOptions } from 'typeorm'
import { ObjectTypeOptions } from '@nestjs/graphql'
import { UIEntityOptions } from 'client/decorators/UIEntity'

export type MagicEntityOptions = EntityOptions &
  ObjectTypeOptions &
  UIEntityOptions

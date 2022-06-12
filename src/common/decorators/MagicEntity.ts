import { EntityOptions } from 'typeorm'
import { InputTypeOptions, ObjectTypeOptions } from '@nestjs/graphql'
import { UIEntityOptions } from 'client/decorators/UIEntity'

export type MagicEntityOptions = EntityOptions &
  ObjectTypeOptions &
  UIEntityOptions &
  InputTypeOptions

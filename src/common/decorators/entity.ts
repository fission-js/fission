import { EntityOptions as OrmEntityOptions } from 'typeorm'
import { InputTypeOptions, ObjectTypeOptions } from '@nestjs/graphql'
import { UIEntityOptions } from 'client/decorators/ui-entity'

export type EntityOptions = OrmEntityOptions &
  ObjectTypeOptions &
  UIEntityOptions &
  InputTypeOptions

import { ColumnOptions } from 'typeorm'
import { FieldOptions as GraphqlFieldOptions } from '@nestjs/graphql'
import { MagicFieldServerOptions } from 'server'
import { UIFieldOptions } from 'client/decorators/ui-field'
import { PrimaryGeneratedColumnNumericOptions } from 'typeorm/decorator/options/PrimaryGeneratedColumnNumericOptions'
import { ServerFieldOptions } from 'server/decorators/server-field'

export type FieldOptions = ColumnOptions &
  PrimaryGeneratedColumnNumericOptions &
  GraphqlFieldOptions &
  MagicFieldServerOptions &
  UIFieldOptions &
  ServerFieldOptions

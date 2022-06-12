import { ColumnOptions } from 'typeorm'
import { FieldOptions } from '@nestjs/graphql'
import { MagicFieldServerOptions } from 'server'
import { UIFieldOptions } from 'client/decorators/UIField'
import { PrimaryGeneratedColumnNumericOptions } from 'typeorm/decorator/options/PrimaryGeneratedColumnNumericOptions'
import { ServerFieldOptions } from 'server/decorators/ServerField'

export type MagicFieldOptions = ColumnOptions &
  PrimaryGeneratedColumnNumericOptions &
  FieldOptions &
  MagicFieldServerOptions &
  UIFieldOptions &
  ServerFieldOptions

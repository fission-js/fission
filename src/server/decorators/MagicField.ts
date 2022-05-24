import { Column, PrimaryGeneratedColumn } from 'typeorm'
import { Field } from '@nestjs/graphql'
import { applyDecorators } from '@nestjs/common'
import { MagicFieldOptions } from 'common/decorators/MagicField'

export interface MagicFieldServerOptions {
  primary?: boolean
}

export const MagicField = (options?: MagicFieldOptions) => {
  return applyDecorators(
    Field(options),
    options?.primary ? PrimaryGeneratedColumn(options) : Column(options),
  )
}

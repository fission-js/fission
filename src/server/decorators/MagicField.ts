import { Column, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ID, ReturnTypeFunc } from '@nestjs/graphql'
import { applyDecorators } from '@nestjs/common'
import { MagicFieldOptions } from 'common/decorators/MagicField'
import { ServerField } from './ServerField'

export interface MagicFieldServerOptions {
  primary?: boolean
}

export const MagicField = (
  typeOrOptions?: MagicFieldOptions | ReturnTypeFunc,
  fieldOptions?: MagicFieldOptions,
) => {
  const [type, options = {}]: [ReturnTypeFunc, MagicFieldOptions] = fieldOptions
    ? [typeOrOptions as ReturnTypeFunc, fieldOptions as MagicFieldOptions]
    : [undefined, typeOrOptions as MagicFieldOptions]
  return applyDecorators(
    Field(options?.primary ? () => ID : type, options),
    options?.primary ? PrimaryGeneratedColumn(options) : Column(options),
    ServerField(type, options),
  )
}

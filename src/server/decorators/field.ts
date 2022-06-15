import { Column, PrimaryGeneratedColumn } from 'typeorm'
import { Field as GraphqlField, ID, ReturnTypeFunc } from '@nestjs/graphql'
import { applyDecorators } from '@nestjs/common'
import { FieldOptions } from '../../common'
import { ServerField } from './server-field'

export interface MagicFieldServerOptions {
  primary?: boolean
}

export const Field = (
  typeOrOptions?: FieldOptions | ReturnTypeFunc,
  fieldOptions?: FieldOptions,
) => {
  const [type, options = {}]: [ReturnTypeFunc, FieldOptions] = fieldOptions
    ? [typeOrOptions as ReturnTypeFunc, fieldOptions as FieldOptions]
    : [undefined, typeOrOptions as FieldOptions]
  return applyDecorators(
    GraphqlField(options?.primary ? () => ID : type, options),
    options?.primary ? PrimaryGeneratedColumn(options) : Column(options),
    ServerField(type, options),
  )
}

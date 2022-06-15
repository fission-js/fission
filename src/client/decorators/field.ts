import { UIField } from './ui-field'
import { FieldOptions } from '../../common'
import { ReturnTypeFunc } from '@nestjs/graphql'

export const Field = (
  typeOrOptions?: FieldOptions | ReturnTypeFunc,
  fieldOptions?: FieldOptions,
) => {
  const options: FieldOptions = fieldOptions
    ? (fieldOptions as FieldOptions)
    : (typeOrOptions as FieldOptions)

  return UIField(options)
}

import { UIField } from './UIField'
import { MagicFieldOptions } from 'common/decorators/MagicField'
import { ReturnTypeFunc } from '@nestjs/graphql'

export const MagicField = (
  typeOrOptions?: MagicFieldOptions | ReturnTypeFunc,
  fieldOptions?: MagicFieldOptions,
) => {
  const options: MagicFieldOptions = fieldOptions
    ? (fieldOptions as MagicFieldOptions)
    : (typeOrOptions as MagicFieldOptions)

  return UIField(options)
}

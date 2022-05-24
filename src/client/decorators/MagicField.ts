import { UIField } from './UIField'
import { MagicFieldOptions } from 'common/decorators/MagicField'

export const MagicField = (options?: MagicFieldOptions): PropertyDecorator => {
  return UIField(options)
}

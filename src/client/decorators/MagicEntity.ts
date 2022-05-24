import { MagicEntityOptions } from 'common/decorators/MagicEntity'
import { UIEntity } from './UIEntity'

export const MagicEntity = (options?: MagicEntityOptions): ClassDecorator => {
  return UIEntity(options)
}

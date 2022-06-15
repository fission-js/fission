import { EntityOptions } from '../../common'
import { UIEntity } from './ui-entity'

export const Entity = (options?: EntityOptions): ClassDecorator => {
  return UIEntity(options)
}

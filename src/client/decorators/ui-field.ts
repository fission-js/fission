import { EntityClass, store } from '../../common'

export type UIFieldOptions = {
  title?: string
  primary?: boolean
}

export const UIField = (options: UIFieldOptions = {}): PropertyDecorator => {
  return (target: Function, propertyKey: string) => {
    const { title = propertyKey, primary = false } = options
    store.addFieldMetadata(target.constructor as EntityClass, propertyKey, {
      title,
      primary,
    })
  }
}

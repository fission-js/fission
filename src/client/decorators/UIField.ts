import { Type, updateFieldMetadata } from '../metadata-store'

export type UIFieldOptions = {
  title?: string
  primary?: boolean
}

export const UIField = (options: UIFieldOptions = {}): PropertyDecorator => {
  return (target: Type<unknown>, propertyKey: string) => {
    const { title = propertyKey, primary = false } = options
    updateFieldMetadata(target, propertyKey, { title, primary })
  }
}

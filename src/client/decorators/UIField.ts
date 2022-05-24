import { Type, updateFieldMetadata } from '../metadata-store'

export type UIFieldOptions = {
  title?: string
}

export const UIField = (options?: UIFieldOptions): PropertyDecorator => {
  return (target: Type<unknown>, propertyKey: string) => {
    updateFieldMetadata(target, propertyKey, options)
  }
}

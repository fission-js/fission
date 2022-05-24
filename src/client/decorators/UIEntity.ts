import { Type, updateEntityMetadata } from '../metadata-store'

export type UIEntityOptions = {
  title?: string
}

export const UIEntity = (options?: UIEntityOptions): ClassDecorator => {
  return (target: Function) => {
    updateEntityMetadata(target, options)
  }
}

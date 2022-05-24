import { updateEntityMetadata } from '../metadata-store'

export interface UIEntityOptions {
  title?: string
  path?: string
}

export const UIEntity = (options: UIEntityOptions = {}): ClassDecorator => {
  return (target: Function) => {
    const { title = target.name, path = target.name } = options
    updateEntityMetadata(target, { title, path })
  }
}

import React, { ComponentType } from 'react'
import { store, EntityBasedComponent, EntityClass } from '../../common'
import { EntityList } from '../ui'

export interface UIEntityOptions {
  title?: string
  path?: string
  list?: ComponentType<EntityBasedComponent>
}

export const UIEntity = (options: UIEntityOptions = {}): ClassDecorator => {
  return (target: Function) => {
    const {
      title = target.name,
      path = target.name,
      list = EntityList,
    } = options
    store.addEntityMetadata(target as EntityClass, { title, path, list })
  }
}

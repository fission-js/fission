import React, { ComponentType } from 'react'
import { ListView, updateEntityMetadata } from '../metadata-store'
import { EntityList } from '../components/EntityList'

export interface UIEntityOptions {
  title?: string
  path?: string
  list?: ComponentType<ListView>
}

export const UIEntity = (options: UIEntityOptions = {}): ClassDecorator => {
  return (target: Function) => {
    const {
      title = target.name,
      path = target.name,
      list = EntityList,
    } = options
    updateEntityMetadata(target, { title, path, list })
  }
}

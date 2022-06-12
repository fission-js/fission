import React, { ComponentType } from 'react'
import { Type } from './Type'

export interface FieldMetadata {
  title?: string
  primary?: boolean
}

export interface ListView {
  entityType: Function
}

export interface EntityMetadata {
  title?: string
  path?: string
  list?: ComponentType<ListView>
  fields: Map<string, FieldMetadata>
}

export const store = new Map<Function, EntityMetadata>()

export const getEntityMetadata = (target: Function): EntityMetadata => {
  const currentMetadata = store.get(target)
  if (currentMetadata) return currentMetadata

  const newMetadata = {
    fields: new Map<string, FieldMetadata>(),
  }
  store.set(target, newMetadata)
  return newMetadata
}

export const updateEntityMetadata = (
  target: Function,
  metadata: Partial<Omit<EntityMetadata, 'fields'>>,
): void => {
  const entityMetadata = getEntityMetadata(target)
  store.set(target, {
    ...metadata,
    ...entityMetadata,
  })
}

export const getFieldMetadata = (
  target: Type<unknown>,
  field: string,
): FieldMetadata => {
  const { constructor } = target
  const { fields } = getEntityMetadata(constructor)

  const currentMetadata = fields.get(field)
  if (currentMetadata) return currentMetadata

  const newMetadata = {}
  fields.set(field, newMetadata)
  return newMetadata
}

export const updateFieldMetadata = (
  target: Type<unknown>,
  field: string,
  metadata: Partial<FieldMetadata>,
): void => {
  const { constructor } = target
  const { fields } = getEntityMetadata(constructor)
  const fieldMetadata = getFieldMetadata(target, field)
  fields.set(field, {
    ...metadata,
    ...fieldMetadata,
  })
}

export const getIdFieldKey = (target: Function) => {
  const { fields } = getEntityMetadata(target)
  return Array.from(fields.entries()).find(([key, { primary }]) => primary)[0]
}

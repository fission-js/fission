import { ComponentType } from 'react'
import { FieldMetadata } from './field-metadata'
import { EntityBasedComponent } from '../entity-based-component'
import { EntityClass as EntityClassType, EntityIdType } from '../entity-type'

export class EntityMetadata<T extends EntityIdType = number> {
  EntityClass: EntityClassType<T>
  title?: string
  path?: string
  list?: ComponentType<EntityBasedComponent<T>>
  private fields: Map<string, FieldMetadata<T>>

  constructor(
    EntityClass: EntityClassType<T>,
    metadata: Partial<EntityMetadata<T>> = {},
  ) {
    this.EntityClass = EntityClass
    this.fields = new Map()
    this.updateMetadata(metadata)
  }

  updateMetadata(metadata: Partial<EntityMetadata<T>> = {}) {
    Object.assign(this, metadata)
    return this
  }

  addFieldMetadata(
    fieldName: string,
    metadata: Partial<Omit<FieldMetadata, 'name'>>,
  ) {
    if (this.fields.get(fieldName))
      throw new Error(
        `For entity "${this.EntityClass.name}" field "${fieldName}" was declared before`,
      )

    const fieldMetadata: FieldMetadata<T> = {
      ...metadata,
      name: fieldName,
      EntityClass: this.EntityClass,
    }
    this.fields.set(fieldName, fieldMetadata)
    return fieldMetadata
  }

  getFields(): FieldMetadata<T>[] {
    return Array.from(this.fields.values())
  }
}

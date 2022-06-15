import { FieldMetadata } from './field-metadata'
import { EntityClass as EntityClassType, EntityIdType } from '../entity-type'
import { EntityMetadata } from './entity-metadata'

class MetadataStore {
  private entities: Map<
    EntityClassType<EntityIdType>,
    EntityMetadata<EntityIdType>
  > = new Map()

  addFieldMetadata<T extends EntityIdType = number>(
    EntityClass: EntityClassType<T>,
    fieldName: string,
    fieldMetadata: Partial<Omit<FieldMetadata, 'name'>>,
  ) {
    const entityMetadata = this.getOrCreateEntityMetadata(EntityClass)
    return entityMetadata.addFieldMetadata(fieldName, fieldMetadata)
  }

  addEntityMetadata<T extends EntityIdType = number>(
    EntityClass: EntityClassType<T>,
    metadata: Partial<EntityMetadata<T>>,
  ): EntityMetadata<T> {
    const entityMetadata = this.getOrCreateEntityMetadata<T>(EntityClass)
    return entityMetadata.updateMetadata(metadata)
  }

  getEntityMetadata<T extends EntityIdType = number>(
    EntityClass: EntityClassType<T>,
  ) {
    return this.entities.get(EntityClass) as EntityMetadata<T>
  }

  getEntityFields<T extends EntityIdType = number>(
    EntityClass: EntityClassType<T>,
  ) {
    const entityMetadata = this.entities.get(EntityClass) as EntityMetadata<T>
    if (!entityMetadata)
      throw new Error(
        `Metadata for entity with name "${EntityClass.name}" was not found.`,
      )

    return entityMetadata.getFields()
  }

  getEntities() {
    return Array.from(this.entities.values())
  }

  private getOrCreateEntityMetadata<T extends EntityIdType = number>(
    EntityClass: EntityClassType<T>,
  ) {
    const entityMetadata = this.entities.get(EntityClass)
    if (entityMetadata) return entityMetadata as EntityMetadata<T>

    const newEntityMetadata = new EntityMetadata<T>(EntityClass)
    this.entities.set(EntityClass, newEntityMetadata)
    return newEntityMetadata
  }
}

export const store = new MetadataStore()

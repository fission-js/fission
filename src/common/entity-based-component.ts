import { EntityClass as EntityClassType, EntityIdType } from './entity-type'

export interface EntityBasedComponent<T extends EntityIdType = number> {
  EntityClass: EntityClassType<T>
}

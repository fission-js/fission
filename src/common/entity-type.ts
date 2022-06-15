export type EntityIdType = number | string

export interface EntityType<T extends EntityIdType = number> {
  id: T
}

export type EntityClass<T extends EntityIdType = number> = {
  new (): EntityType<T>
}

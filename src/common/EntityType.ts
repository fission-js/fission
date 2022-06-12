export type EntityIdType = number | string

export type EntityType<T extends EntityIdType = number> = {
  id: T
  [key: string]: unknown
}

export type EntityClass<T extends EntityIdType = number> = {
  new (): EntityType<T>
}

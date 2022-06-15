import { Field, InputType } from '@nestjs/graphql'
import {
  EntityClass as EntityClassType,
  EntityIdType,
  FieldMetadata,
  store,
} from '../common'

// TODO input тип для создания должен копировать нуллебл, а для обновления все поля возможны нуллебл

const getInputType = <T extends EntityIdType = number>(
  EntityClass: EntityClassType<T>,
  fields: FieldMetadata<T>[],
  name: string,
): any => {
  @InputType(name)
  class MagicInput {}

  fields.map(({ name, schemaName, typeFn }) =>
    Field(typeFn, { name: schemaName, nullable: true })(
      MagicInput.prototype,
      name,
    ),
  )

  return MagicInput
}

export const inputTypeWithoutId = <T extends EntityIdType = number>(
  EntityClass: EntityClassType<T>,
): any =>
  getInputType(
    EntityClass,
    store
      .getEntityFields(EntityClass)
      .filter(({ primary = false }) => !primary),
    `${EntityClass.name}InputWithoutId`,
  )

export const inputTypeWithId = <T extends EntityIdType = number>(
  EntityClass: EntityClassType<T>,
): any =>
  getInputType(
    EntityClass,
    store.getEntityFields(EntityClass),
    `${EntityClass.name}InputWithId`,
  )

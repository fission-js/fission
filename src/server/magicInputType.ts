import { Field, InputType } from '@nestjs/graphql'
import { fields } from './decorators/ServerField'
import { EntityClass as EntityClassType, EntityIdType } from 'common/EntityType'
import { FieldMetadata } from 'server/decorators/ServerField'

const getEntityFields = <T extends EntityIdType = number>(
  EntityClass: EntityClassType<T>,
): FieldMetadata[] => {
  return fields.filter(({ target }) => target === EntityClass)
}

// TODO input тип для создания должен копировать нуллебл, а для обновления все поля возможны нуллебл

const getInputType = <T extends EntityIdType = number>(
  EntityClass: EntityClassType<T>,
  fields: FieldMetadata[],
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

export const magicInputTypeWithoutId = <T extends EntityIdType = number>(
  EntityClass: EntityClassType<T>,
): any =>
  getInputType(
    EntityClass,
    getEntityFields(EntityClass).filter(
      ({ options: { primary = false } }) => !primary,
    ),
    `${EntityClass.name}InputWithoutId`,
  )

export const magicInputTypeWithId = <T extends EntityIdType = number>(
  EntityClass: EntityClassType<T>,
): any =>
  getInputType(
    EntityClass,
    getEntityFields(EntityClass),
    `${EntityClass.name}InputWithId`,
  )

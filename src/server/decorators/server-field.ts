import { FieldOptions, ReturnTypeFunc } from '@nestjs/graphql'
import { reflectTypeFromMetadata } from '@nestjs/graphql/dist/utils/reflection.utilts'
import { EntityClass, store } from '../../common'

export type ServerFieldOptions = FieldOptions & { primary?: boolean }

export const ServerField = (
  type: ReturnTypeFunc,
  options: ServerFieldOptions,
): PropertyDecorator => {
  return (prototype: Object, propertyKey: string) => {
    const { typeFn: getType, options: typeOptions } = reflectTypeFromMetadata({
      metadataKey: 'design:type',
      prototype,
      propertyKey,
      explicitTypeFn: type,
      typeOptions: options,
    })

    store.addFieldMetadata(prototype.constructor as EntityClass, propertyKey, {
      schemaName: options.name || propertyKey,
      typeFn: getType,
      options: typeOptions as ServerFieldOptions,
      description: options.description,
      deprecationReason: options.deprecationReason,
      complexity: options.complexity,
      middleware: options.middleware,
    })
  }
}

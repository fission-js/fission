import { FieldOptions, ReturnTypeFunc } from '@nestjs/graphql'
import { reflectTypeFromMetadata } from '@nestjs/graphql/dist/utils/reflection.utilts'
import { PropertyMetadata } from '@nestjs/graphql/dist/schema-builder/metadata'

export type ServerFieldOptions = FieldOptions & { primary?: boolean }
export type FieldMetadata = PropertyMetadata & { options: ServerFieldOptions }
export const fields: FieldMetadata[] = []

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

    fields.push({
      name: propertyKey,
      schemaName: options.name || propertyKey,
      typeFn: getType,
      options: typeOptions as ServerFieldOptions,
      target: prototype.constructor,
      description: options.description,
      deprecationReason: options.deprecationReason,
      complexity: options.complexity,
      middleware: options.middleware,
    })
  }
}

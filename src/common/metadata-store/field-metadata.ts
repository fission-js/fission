import { FieldOptions } from '@nestjs/graphql'
import { Complexity, GqlTypeReference } from '@nestjs/graphql/dist/interfaces'
import { MethodArgsMetadata } from '@nestjs/graphql/dist/schema-builder/metadata/param.metadata'
import { DirectiveMetadata } from '@nestjs/graphql/dist/schema-builder/metadata/directive.metadata'
import { FieldMiddleware } from '@nestjs/graphql/dist/interfaces/field-middleware.interface'
import { EntityClass as EntityClassType, EntityIdType } from '../entity-type'

export type ServerFieldOptions = FieldOptions

export interface FieldMetadata<T extends EntityIdType = number> {
  name: string
  title?: string
  primary?: boolean
  options?: ServerFieldOptions
  schemaName?: string
  typeFn?: () => GqlTypeReference
  EntityClass: EntityClassType<T>
  description?: string
  deprecationReason?: string
  methodArgs?: MethodArgsMetadata[]
  directives?: DirectiveMetadata[]
  extensions?: Record<string, unknown>
  complexity?: Complexity
  middleware?: FieldMiddleware[]
}

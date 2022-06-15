import { DynamicModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { resolver } from './resolver'
import { EntityClass as EntityClassType, EntityIdType } from '../common'

@Module({})
export class EntityModule {
  static forRoot<T extends EntityIdType = number>(
    EntityClass: EntityClassType<T>,
  ): DynamicModule {
    return {
      module: EntityModule,
      imports: [TypeOrmModule.forFeature([EntityClass])],
      providers: [resolver(EntityClass)],
    }
  }
}

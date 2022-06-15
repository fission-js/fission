import { DynamicModule as NestDynamicModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { resolver } from './resolver'
import { EntityClass as EntityClassType, EntityIdType } from '../common'

@Module({})
export class DynamicModule {
  static forRoot<T extends EntityIdType = number>(
    EntityClass: EntityClassType<T>,
  ): NestDynamicModule {
    return {
      module: DynamicModule,
      imports: [TypeOrmModule.forFeature([EntityClass])],
      providers: [resolver(EntityClass)],
    }
  }
}

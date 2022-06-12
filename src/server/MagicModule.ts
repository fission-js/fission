import { DynamicModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { magicResolver } from './magicResolver'
import { EntityClass as EntityClassType, EntityIdType } from 'common/EntityType'

@Module({})
export class MagicModule {
  static forRoot<T extends EntityIdType = number>(
    EntityClass: EntityClassType<T>,
  ): DynamicModule {
    return {
      module: MagicModule,
      imports: [TypeOrmModule.forFeature([EntityClass])],
      providers: [magicResolver(EntityClass)],
    }
  }
}

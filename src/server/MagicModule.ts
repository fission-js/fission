import { DynamicModule, Module } from '@nestjs/common'
import { WithID } from './WithID'
import { TypeOrmModule } from '@nestjs/typeorm'
import { magicResolver } from './magicResolver'

@Module({})
export class MagicModule {
  static forRoot = (entity: new () => WithID): DynamicModule => {
    return {
      module: MagicModule,
      imports: [TypeOrmModule.forFeature([entity])],
      providers: [magicResolver(entity)],
    }
  }
}

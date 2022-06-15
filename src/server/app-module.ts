import { Module, DynamicModule, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Type } from '@nestjs/common/interfaces/type.interface'
import { ForwardReference } from '@nestjs/common/interfaces/modules/forward-reference.interface'

@Module({})
export class AppModule {
  static forRoot(
    EntityModules: Array<
      Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
    >,
  ): DynamicModule {
    return {
      module: AppModule,
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: +process.env.PG_PORT,
          username: process.env.PG_USER,
          password: process.env.PG_PASSWORD,
          database: process.env.PG_DB_NAME,
          entities: [],
          synchronize: true,
          autoLoadEntities: true,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: true,
        }),
        ...EntityModules,
      ],
    }
  }
}

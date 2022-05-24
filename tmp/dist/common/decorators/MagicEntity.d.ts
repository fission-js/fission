import { EntityOptions } from 'typeorm';
import { ObjectTypeOptions } from '@nestjs/graphql';
import { UIEntityOptions } from 'client/decorators/UIEntity';
export declare type MagicEntityOptions = EntityOptions & ObjectTypeOptions & UIEntityOptions;

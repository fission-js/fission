import { DynamicModule } from '@nestjs/common';
import { WithID } from './WithID';
export declare class MagicModule {
    static forRoot: (entity: new () => WithID) => DynamicModule;
}

import { MagicFieldOptions } from 'common/decorators/MagicField';
export interface MagicFieldServerOptions {
    primary?: boolean;
}
export declare const MagicField: (options?: MagicFieldOptions) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;

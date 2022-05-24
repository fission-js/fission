import { MagicEntityOptions } from 'common/decorators/MagicEntity';
export declare const MagicEntity: (options?: MagicEntityOptions) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;

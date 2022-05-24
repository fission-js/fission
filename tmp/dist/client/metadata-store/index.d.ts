export interface Type<T = any> extends Function {
    new (...args: any[]): T;
}
export interface FieldMetadata {
    title?: string;
}
export interface EntityMetadata {
    title?: string;
    path?: string;
    fields: Map<string, FieldMetadata>;
}
export declare const store: Map<Function, EntityMetadata>;
export declare const getEntityMetadata: (target: Function) => EntityMetadata;
export declare const updateEntityMetadata: (target: Function, metadata: Partial<Omit<EntityMetadata, 'fields'>>) => void;
export declare const getFieldMetadata: (target: Type<unknown>, field: string) => FieldMetadata;
export declare const updateFieldMetadata: (target: Type<unknown>, field: string, metadata: Partial<FieldMetadata>) => void;

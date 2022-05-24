"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFieldMetadata = exports.getFieldMetadata = exports.updateEntityMetadata = exports.getEntityMetadata = exports.store = void 0;
exports.store = new Map();
const getEntityMetadata = (target) => {
    const currentMetadata = exports.store.get(target);
    if (currentMetadata)
        return currentMetadata;
    const newMetadata = {
        fields: new Map(),
    };
    exports.store.set(target, newMetadata);
    return newMetadata;
};
exports.getEntityMetadata = getEntityMetadata;
const updateEntityMetadata = (target, metadata) => {
    const entityMetadata = (0, exports.getEntityMetadata)(target);
    exports.store.set(target, Object.assign(Object.assign({}, metadata), entityMetadata));
};
exports.updateEntityMetadata = updateEntityMetadata;
const getFieldMetadata = (target, field) => {
    const { constructor } = target;
    const { fields } = (0, exports.getEntityMetadata)(constructor);
    const currentMetadata = fields.get(field);
    if (currentMetadata)
        return currentMetadata;
    const newMetadata = {};
    fields.set(field, newMetadata);
    return newMetadata;
};
exports.getFieldMetadata = getFieldMetadata;
const updateFieldMetadata = (target, field, metadata) => {
    const { constructor } = target;
    const { fields } = (0, exports.getEntityMetadata)(constructor);
    const fieldMetadata = (0, exports.getFieldMetadata)(target, field);
    fields.set(field, Object.assign(Object.assign({}, metadata), fieldMetadata));
};
exports.updateFieldMetadata = updateFieldMetadata;

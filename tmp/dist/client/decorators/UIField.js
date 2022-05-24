"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIField = void 0;
const metadata_store_1 = require("../metadata-store");
const UIField = (options) => {
    return (target, propertyKey) => {
        (0, metadata_store_1.updateFieldMetadata)(target, propertyKey, options);
    };
};
exports.UIField = UIField;

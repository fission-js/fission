"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIEntity = void 0;
const metadata_store_1 = require("../metadata-store");
const UIEntity = (options) => {
    return (target) => {
        (0, metadata_store_1.updateEntityMetadata)(target, options);
    };
};
exports.UIEntity = UIEntity;

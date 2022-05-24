"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MagicEntity = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const MagicEntity = (options) => {
    return (0, common_1.applyDecorators)((0, typeorm_1.Entity)(options), (0, graphql_1.ObjectType)(options));
};
exports.MagicEntity = MagicEntity;

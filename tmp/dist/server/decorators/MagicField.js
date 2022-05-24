"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MagicField = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const MagicField = (options) => {
    return (0, common_1.applyDecorators)((0, graphql_1.Field)(options), (options === null || options === void 0 ? void 0 : options.primary) ? (0, typeorm_1.PrimaryGeneratedColumn)(options) : (0, typeorm_1.Column)(options));
};
exports.MagicField = MagicField;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MagicModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MagicModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const magicResolver_1 = require("./magicResolver");
let MagicModule = MagicModule_1 = class MagicModule {
};
MagicModule.forRoot = (entity) => {
    return {
        module: MagicModule_1,
        imports: [typeorm_1.TypeOrmModule.forFeature([entity])],
        providers: [(0, magicResolver_1.magicResolver)(entity)],
    };
};
MagicModule = MagicModule_1 = __decorate([
    (0, common_1.Module)({})
], MagicModule);
exports.MagicModule = MagicModule;

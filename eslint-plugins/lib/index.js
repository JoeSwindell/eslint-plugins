"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = exports.rules = void 0;
const no_browsermodule_in_feature_1 = __importDefault(require("./rules/no-browsermodule-in-feature"));
exports.rules = {
    'no-browsermodule-in-feature': no_browsermodule_in_feature_1.default,
};
exports.configs = {
    recommended: {
        plugins: ['no-browsermodule'],
        rules: {
            'no-browsermodule/no-browsermodule-in-feature': 'error',
        },
    },
};
//# sourceMappingURL=index.js.map
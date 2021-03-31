"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapModuleModelToModuleConfig = void 0;
var copy_keys_1 = require("./copy-keys");
function mapModuleModelToModuleConfig(model, isModerator, canChangeModule) {
    if (isModerator === void 0) { isModerator = false; }
    if (canChangeModule === void 0) { canChangeModule = false; }
    var config = isModerator
        ? copy_keys_1.copyKeys(model, 'title', 'description', 'price', '_id', 'condition')
        : copy_keys_1.copyKeys(model, 'title', 'description', 'price', '_id');
    return Object.assign(config, { canChangeModule: canChangeModule });
}
exports.mapModuleModelToModuleConfig = mapModuleModelToModuleConfig;

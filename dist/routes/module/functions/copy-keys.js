"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyKeys = void 0;
function copyKeys(obj) {
    var keys = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        keys[_i - 1] = arguments[_i];
    }
    var resultObj = {};
    keys.forEach(function (key) {
        if (!!obj[key]) {
            resultObj[key] = obj[key];
        }
    });
    return resultObj;
}
exports.copyKeys = copyKeys;

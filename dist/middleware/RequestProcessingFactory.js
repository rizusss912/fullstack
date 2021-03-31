"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestProcessingFactory = void 0;
var RequestProcessingFactory = /** @class */ (function () {
    function RequestProcessingFactory() {
    }
    RequestProcessingFactory.unauthorized = function (handler) {
        return handler;
    };
    return RequestProcessingFactory;
}());
exports.RequestProcessingFactory = RequestProcessingFactory;

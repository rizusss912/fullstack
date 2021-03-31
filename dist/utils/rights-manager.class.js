"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RightsManager = void 0;
var status_enum_1 = require("../models/enums/status.enum");
var StatusesManager = /** @class */ (function () {
    function StatusesManager(statuses) {
        this.statuses = statuses;
    }
    Object.defineProperty(StatusesManager.prototype, "isModerator", {
        get: function () {
            return this.hasStatuses([status_enum_1.Status.Admin, status_enum_1.Status.Moderator]);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StatusesManager.prototype, "isAdmin", {
        get: function () {
            return this.hasStatuses([status_enum_1.Status.Admin]);
        },
        enumerable: false,
        configurable: true
    });
    StatusesManager.prototype.hasStatuses = function (statuses) {
        var _this = this;
        return statuses.some(function (status) { return _this.statuses.includes(status); });
    };
    return StatusesManager;
}());
// Когда (если) в UserModel будут хранится Action, нужно будет переписать механизм canUseAction
var RightsManager = /** @class */ (function (_super) {
    __extends(RightsManager, _super);
    function RightsManager(user) {
        var _this = _super.call(this, user.statuses) || this;
        _this.useActionMap = {
            createModule: _this.isAdmin,
            changeModule: _this.isAdmin,
            deleteModule: _this.isAdmin,
            patchModule: _this.isAdmin,
        };
        _this.user = user;
        return _this;
    }
    RightsManager.prototype.canUseAction = function (action) {
        return this.useActionMap[action];
    };
    return RightsManager;
}(StatusesManager));
exports.RightsManager = RightsManager;

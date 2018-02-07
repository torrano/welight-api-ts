"use strict";
// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var api = require("ts-resource-tastypie");
var Loja = /** @class */ (function (_super) {
    __extends(Loja, _super);
    function Loja(obj) {
        var _this = _super.call(this, Loja.resource, obj) || this;
        var _self = _this;
        if (_self.id) {
            _self._cupons = new api.Tastypie.Resource('afiliadora/cupom', { model: Cupom, defaults: { loja: _self.id } });
        }
        return _this;
    }
    Object.defineProperty(Loja.prototype, "cupons", {
        get: function () {
            return this._cupons;
        },
        enumerable: true,
        configurable: true
    });
    Loja.resource = new api.Tastypie.Resource('afiliadora/loja', { model: Loja });
    return Loja;
}(api.Tastypie.Model));
exports.Loja = Loja;
var Cupom = /** @class */ (function (_super) {
    __extends(Cupom, _super);
    function Cupom(obj) {
        return _super.call(this, Cupom.resource, obj) || this;
    }
    Cupom.resource = new api.Tastypie.Resource('afiliadora/cupom', { model: Cupom });
    return Cupom;
}(api.Tastypie.Model));
exports.Cupom = Cupom;
//# sourceMappingURL=afiliadora.js.map
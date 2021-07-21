"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
var importProxy_1 = require("./importProxy");
function create() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.length === 0 ?
        new importProxy_1.importProxy.Evt() :
        new importProxy_1.importProxy.StatefulEvt(args[0]);
}
exports.create = create;
//# sourceMappingURL=Evt.create.js.map
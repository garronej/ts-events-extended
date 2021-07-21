"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useElementEvt = exports.useRerenderOnStateChange = exports.useEvt = void 0;
/*
NOTE: In theory react should be a peer dependency
instead of a dev dependency.
But given that /hook is just a plugin for using Evt
with react we don't want to require react to be
installed to install Evt.
*/
var useEvt_1 = require("./useEvt");
Object.defineProperty(exports, "useEvt", { enumerable: true, get: function () { return useEvt_1.useEvt; } });
var useRerenderOnStateChange_1 = require("./useRerenderOnStateChange");
Object.defineProperty(exports, "useRerenderOnStateChange", { enumerable: true, get: function () { return useRerenderOnStateChange_1.useRerenderOnStateChange; } });
var useElementEvt_1 = require("./useElementEvt");
Object.defineProperty(exports, "useElementEvt", { enumerable: true, get: function () { return useElementEvt_1.useElementEvt; } });
//# sourceMappingURL=index.js.map
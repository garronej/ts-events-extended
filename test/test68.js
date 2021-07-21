"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var assert_1 = require("tsafe/assert");
;
var warn_str = "";
Object.defineProperty(console, "warn", {
    "value": function (str) { return warn_str += str + "\n"; }
});
var evt = new lib_1.Evt();
for (var i = 1; i <= 60; i++) {
    if (i === 27) {
        evt.enableTrace({
            "id": "my event",
            "log": false
        });
    }
    evt.attach(function () {
        console.log("identification from source");
    });
}
var warn_str_expected = "MaxHandlersExceededWarning: Possible Evt memory leak detected.26 handlers attached.\nUse Evt.prototype.setMaxHandlers(n) to increase limit on a specific Evt.\nUse Evt.setDefaultMaxHandlers(n) to change the default limit currently set to 25.\n\n26 handlers like:\n{\n  hasCtx: false,\n  once: false,\n  prepend: false,\n  extract: false,\n  isWaitFor: false,\n  callback: function () {\n        console.log(\"identification from source\");\n    }\n}\n\nTo validate the identify of the Evt instance that is triggering this warning you can call Evt.prototype.enableTrace({ \"id\": \"My evt id\", \"log\": false }) on the Evt that you suspect.\n\nMaxHandlersExceededWarning: Possible Evt memory leak detected.52 handlers attached to \"my event\".\nUse Evt.prototype.setMaxHandlers(n) to increase limit on a specific Evt.\nUse Evt.setDefaultMaxHandlers(n) to change the default limit currently set to 25.\n\n52 handlers like:\n{\n  hasCtx: false,\n  once: false,\n  prepend: false,\n  extract: false,\n  isWaitFor: false,\n  callback: function () {\n        console.log(\"identification from source\");\n    }\n}\n\n";
assert_1.assert(warn_str === warn_str_expected);
console.log("PASS");
//# sourceMappingURL=test68.js.map
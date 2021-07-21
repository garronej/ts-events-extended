"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCallableFunction = void 0;
/** NOTE: constructors are of type "function" but are not callable,
 * without the new keyword.
 * This function will return true if and only if the object passed is
 * a function and it is not a constructor.
 */
function isCallableFunction(o) {
    if (typeof o !== "function") {
        return false;
    }
    var prototype = o["prototype"];
    if (!prototype)
        return true;
    var methods = Object.getOwnPropertyNames(prototype);
    if (methods.length !== 1)
        return false;
    var name = o.name;
    if (!name)
        return true;
    if (name[0].toUpperCase() === name[0])
        return false;
    return true;
}
exports.isCallableFunction = isCallableFunction;
//# sourceMappingURL=isCallableFunction.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var assert_1 = require("tsafe/assert");
var id_1 = require("tsafe/id");
var acc = "";
var startUi = (function () {
    var createPersonLogger = function (_a) {
        var person = _a.person, evtFieldChange = _a.evtFieldChange;
        return evtFieldChange.attach(function (field) { return acc += person.name + " " + field + " changed\n"; });
    };
    return function (_a) {
        var evtPersonChange = _a.evtPersonChange;
        var ctx = lib_1.Evt.newCtx();
        evtPersonChange.$attach(function (personChange) { return personChange.eventType === "NEW" ?
            [personChange.person] : null; }, ctx, function (person) { return createPersonLogger({
            person: person,
            "evtFieldChange": (function () {
                var ctx = lib_1.Evt.newCtx();
                return evtPersonChange.pipe(ctx, function (personChange, registerSideEffect) { return personChange.person !== person ?
                    null
                    :
                        (function () {
                            switch (personChange.eventType) {
                                case "NEW": return null;
                                case "UPDATE": return [personChange.field];
                                case "DELETE": return (registerSideEffect(function () { return ctx.done(); }), null);
                            }
                        })(); });
            })()
        }); });
    };
})();
var updateModelFactory = function (_a) {
    var postPersonChange = _a.postPersonChange, handlerHandlingEventCount = _a.handlerHandlingEventCount;
    var sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(function () { return resolve(); }, ms); }); };
    var updateModel = function (person) { return __awaiter(void 0, void 0, void 0, function () {
        var personChange, personChange, personChange, personChange;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    {
                        personChange = {
                            "eventType": "NEW",
                            person: person
                        };
                        assert_1.assert(handlerHandlingEventCount(personChange) === 1);
                        postPersonChange(personChange);
                        assert_1.assert(handlerHandlingEventCount(personChange) === 1);
                    }
                    return [4 /*yield*/, sleep(30)];
                case 1:
                    _a.sent();
                    {
                        person.age++;
                        personChange = {
                            "eventType": "UPDATE",
                            "field": "age",
                            person: person
                        };
                        assert_1.assert(handlerHandlingEventCount(personChange) === 1);
                        postPersonChange(personChange);
                        assert_1.assert(handlerHandlingEventCount(personChange) === 1);
                    }
                    return [4 /*yield*/, sleep(20)];
                case 2:
                    _a.sent();
                    {
                        person.name += " (verified)";
                        personChange = {
                            "eventType": "UPDATE",
                            "field": "name",
                            person: person
                        };
                        assert_1.assert(handlerHandlingEventCount(personChange) === 1);
                        postPersonChange(personChange);
                        assert_1.assert(handlerHandlingEventCount(personChange) === 1);
                    }
                    return [4 /*yield*/, sleep(40)];
                case 3:
                    _a.sent();
                    {
                        personChange = {
                            "eventType": "DELETE",
                            person: person
                        };
                        assert_1.assert(handlerHandlingEventCount(personChange) === 1);
                        postPersonChange(personChange);
                        assert_1.assert(handlerHandlingEventCount(personChange) === 0);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return { updateModel: updateModel };
};
(function main() {
    var evtPersonChange = new lib_1.Evt();
    startUi({ evtPersonChange: evtPersonChange });
    var updateModel = updateModelFactory({
        "postPersonChange": function (personChange) { return evtPersonChange.post(personChange); },
        "handlerHandlingEventCount": function (personChange) {
            return evtPersonChange
                .getHandlers()
                .filter(function (_a) {
                var op = _a.op;
                return evtPersonChange.isHandledByOp(op, personChange);
            })
                .length;
        }
    }).updateModel;
    Promise.all(id_1.id([
        ["Alice", 55],
        ["Bob", 12],
        ["Louis", 15],
        ["John", 44],
        ["Paul", 33]
    ]).map(function (_a) {
        var _b = __read(_a, 2), name = _b[0], age = _b[1];
        return updateModel({ name: name, age: age });
    })).then(function () {
        //The only remaining handler is the one listening for new person.
        assert_1.assert(evtPersonChange.getHandlers().length === 1);
        assert_1.assert(acc ===
            [
                "Alice age changed",
                "Bob age changed",
                "Louis age changed",
                "John age changed",
                "Paul age changed",
                "Alice (verified) name changed",
                "Bob (verified) name changed",
                "Louis (verified) name changed",
                "John (verified) name changed",
                "Paul (verified) name changed",
                ""
            ].join("\n"));
        console.log("PASS");
    });
})();
//# sourceMappingURL=test39.js.map
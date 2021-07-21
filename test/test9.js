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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypedPersonIntro = exports.isTyped = void 0;
var index_1 = require("../lib/index");
function isTyped(p) {
    return p.sex ? true : false;
}
exports.isTyped = isTyped;
var testCount = 0;
var TypedPersonIntro = /** @class */ (function () {
    function TypedPersonIntro() {
        this.intro = "this person is ";
    }
    TypedPersonIntro.prototype.introduce = function (tp) {
        console.assert(this.intro + tp.sex === "this person is female" && tp === sourceEvt[1]);
        testCount++;
    };
    return TypedPersonIntro;
}());
exports.TypedPersonIntro = TypedPersonIntro;
var tpi = new TypedPersonIntro();
var evt = new index_1.Evt();
//evt.enableTrace("evt");
var sourceEvt = [
    {
        "name": "Joseph",
        "age": 26
    },
    {
        "name": "Sienna",
        "age": 22,
        "sex": "female"
    },
    {
        "name": "Antonin",
        "age": 22,
        "sex": "male"
    },
    {
        "name": "Joseph",
        "age": 26
    },
    {
        "name": "Jean-Marc",
        "age": 53,
        "sex": "male"
    }
];
console.assert(evt.getHandlers().length === 0);
console.assert(evt.getHandlers().filter(function (_a) {
    var once = _a.once, async = _a.async;
    return once && !async;
}).length === 0);
console.assert(evt.getHandlers().filter(function (_a) {
    var once = _a.once;
    return !once;
}).length === 0);
console.assert(evt.getHandlers().filter(function (_a) {
    var async = _a.async;
    return async;
}).length === 0);
evt.attachOnce(isTyped, function (person) { return tpi.introduce(person); });
console.assert(evt.getHandlers().length === 1);
console.assert(evt.getHandlers().filter(function (_a) {
    var once = _a.once, async = _a.async;
    return once && !async;
}).length === 1);
console.assert(evt.getHandlers().filter(function (_a) {
    var once = _a.once;
    return !once;
}).length === 0);
console.assert(evt.getHandlers().filter(function (_a) {
    var async = _a.async;
    return async;
}).length === 0);
var resultAttach = [];
evt.attach(function (person) { return resultAttach.push(person); });
console.assert(evt.getHandlers().length === 2);
console.assert(evt.getHandlers().filter(function (_a) {
    var once = _a.once, async = _a.async;
    return once && !async;
}).length === 1);
console.assert(evt.getHandlers().filter(function (_a) {
    var once = _a.once;
    return !once;
}).length === 1);
console.assert(evt.getHandlers().filter(function (_a) {
    var async = _a.async;
    return async;
}).length === 0);
setTimeout(function () {
    console.assert(evt.postCount === 0);
    evt.post(sourceEvt[0]);
    evt.post(sourceEvt[1]);
    console.assert(evt.getHandlers().length === 1);
    console.assert(evt.getHandlers().filter(function (_a) {
        var once = _a.once, async = _a.async;
        return once && !async;
    }).length === 0);
    console.assert(evt.getHandlers().filter(function (_a) {
        var once = _a.once;
        return !once;
    }).length === 1);
    console.assert(evt.getHandlers().filter(function (_a) {
        var async = _a.async;
        return async;
    }).length === 0);
    evt.post(sourceEvt[2]);
}, 0);
setTimeout(function () {
    console.assert(evt.getHandlers().length === 2);
    console.assert(evt.getHandlers().filter(function (_a) {
        var once = _a.once, async = _a.async;
        return once && !async;
    }).length === 0);
    console.assert(evt.getHandlers().filter(function (_a) {
        var once = _a.once;
        return !once;
    }).length === 1);
    console.assert(evt.getHandlers().filter(function (_a) {
        var async = _a.async;
        return async;
    }).length === 1);
    evt.post(sourceEvt[3]);
    evt.post(sourceEvt[4]);
    console.assert(evt.postCount === 5);
    console.assert(testCount === 1);
    for (var i = 0; i < resultAttach.length; i++)
        console.assert(resultAttach[i] === sourceEvt[i]);
}, 200);
var success = false;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var personCount, arr, typedPerson;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                personCount = 0;
                arr = [];
                _a.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 3];
                return [4 /*yield*/, evt.waitFor(isTyped)];
            case 2:
                typedPerson = _a.sent();
                console.assert(evt.getHandlers().filter(function (_a) {
                    var async = _a.async;
                    return async;
                }).length === 0);
                arr.push(typedPerson);
                if (++personCount === 3)
                    return [3 /*break*/, 3];
                return [3 /*break*/, 1];
            case 3:
                console.assert(arr[0] === sourceEvt[1] && arr[1] === sourceEvt[2] && arr[2] === sourceEvt[4], "m");
                success = true;
                return [2 /*return*/];
        }
    });
}); })();
setTimeout(function () {
    console.assert(success);
    console.log("PASS");
}, 2000);
//# sourceMappingURL=test9.js.map
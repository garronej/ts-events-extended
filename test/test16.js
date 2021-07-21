"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../lib/index");
var animals = [
    { "type": "CAT", "cute": true, "name": "boubou" },
    { "type": "SPIDER", "cute": false, "name": "spiderMan" },
    { "type": "CAT", "cute": true, "name": "miaou" },
    { "type": "SPIDER", "cute": false, "name": "aracnide" }
];
var cats = animals.filter(function (_a) {
    var type = _a.type;
    return type === "CAT";
});
var spiders = animals.filter(function (_a) {
    var type = _a.type;
    return type === "SPIDER";
});
var evtAnimal = new index_1.Evt();
evtAnimal.attach(function (animal) {
    console.assert(spiders.shift() === animal);
});
evtAnimal.attachExtract(function (animal) { return animal.type === "CAT"; }, function (cat) {
    console.assert(cats.shift() === cat);
});
(function main() {
    var e_1, _a;
    try {
        for (var animals_1 = __values(animals), animals_1_1 = animals_1.next(); !animals_1_1.done; animals_1_1 = animals_1.next()) {
            var animal = animals_1_1.value;
            evtAnimal.post(animal);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (animals_1_1 && !animals_1_1.done && (_a = animals_1.return)) _a.call(animals_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    console.log("PASS");
})();
//# sourceMappingURL=test16.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
//Type only test
if (1 + 0 === 2) {
    {
        var count_1 = 0;
        var rate_1 = 1000;
        var lastClick_1 = Date.now() - rate_1;
        document.addEventListener('click', function (event) {
            if (Date.now() - lastClick_1 >= rate_1) {
                count_1 += event.clientX;
                console.log(count_1);
                lastClick_1 = Date.now();
            }
        });
    }
    //clientX should be number
    lib_1.Evt.from(document, "click")
        .pipe(lib_1.throttleTime(1000), function (event) { return [parseInt(event.clientX.toFixed())]; }, [function (clientX, count) { return [count + clientX]; }, 0]).attach(function (count) { return console.log(count); });
    {
        var count_2 = 0;
        var rate_2 = 1000;
        var lastClick_2 = Date.now() - rate_2;
        document.getElementById("app").addEventListener('click', function (event) {
            if (Date.now() - lastClick_2 >= rate_2) {
                count_2 += event.clientX;
                console.log(count_2);
                lastClick_2 = Date.now();
            }
        });
    }
    //clientX should be number
    lib_1.Evt.from(document.getElementById("app"), "click")
        .pipe(lib_1.throttleTime(1000), function (event) { return [parseInt(event.clientX.toFixed())]; }, [function (clientX, count) { return [count + clientX]; }, 0]).attach(function (count) { return console.log(count); });
}
console.log("PASS");
//# sourceMappingURL=test65.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partition = exports.arrPartition = void 0;
var assert_1 = require("tsafe/assert");
var is_1 = require("tsafe/is");
var reduceify_1 = require("./reduceify");
function arrPartitionImpl(arr, matcher) {
    return arr.reduce(function (previousValue, currentValue) {
        if (matcher(currentValue)) {
            previousValue[0].push(currentValue);
        }
        else {
            //NOTE: Should be deduced by the compiler
            assert_1.assert(is_1.is(currentValue));
            previousValue[1].push(currentValue);
        }
        return previousValue;
    }, [[], []]);
}
function arrPartition(arr, matcher) {
    return arrPartitionImpl(arr, function (entry) { return matcher(entry); });
}
exports.arrPartition = arrPartition;
function partition(matcher) {
    return reduceify_1.toReduceArguments(arrPartition, matcher);
}
exports.partition = partition;
//# sourceMappingURL=partition.js.map
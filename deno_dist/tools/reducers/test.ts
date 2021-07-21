import { assert } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/assert.ts";
import { every, allEqualsTo, allEquals, removeDuplicates, partition, allUniq, and, count, includes, or, sameAs, diff } from "./index.ts";
import { arrEvery } from "./every.ts";
import { arrPartition } from "./partition.ts";
import { same } from "../inDepth/same.ts";

assert(["foo", "foo", "foo"].reduce(...every<string>(e => e === "foo")) === true);
assert(["foo", "foo", "bar"].reduce(...every<string>(e => e === "foo")) === false);

assert(arrEvery([], (e: string) => e === "foo") === true);

assert([].reduce(...every<string>(e => e === "foo")) === true);

assert(["foo", "foo", "foo"].reduce(...allEqualsTo("foo")) === true);
assert(["foo"].reduce(...allEqualsTo("foo")) === true);
assert([].reduce(...allEqualsTo("foo")) === true);
assert(["foo", "bar", "foo"].reduce(...allEqualsTo("foo")) === false);
assert(["bar", "bar", "foo"].reduce(...allEqualsTo("foo")) === false);
assert(["bar"].reduce(...allEqualsTo("foo")) === false);

assert(
    ["foo", "foo_", "foo__"].reduce(
        ...allEqualsTo(
            "foo",
            (e1, to) => e1.startsWith(to))
    ) === true
);

assert(
    ["foo", "foo_", "foo__", "_foo"].reduce(
        ...allEqualsTo(
            "foo",
            (e1, to) => e1.startsWith(to)
        )
    ) === false
);

assert(["foo", "foo"].reduce(...allEquals()) === true);
assert(["foo"].reduce(...allEquals()) === true);
assert([].reduce(...allEquals()) === true);
assert(["foo", "bar"].reduce(...allEquals()) === false);
assert(["foo", "bar", "baz"].reduce(...allEquals()) === false);


assert(
    [
        ["a", "b", "c"],
        ["a", "b", "c"],
        ["a", "b", "c"]
    ].reduce(...allEquals<string[]>(
        (e1, e2) => JSON.stringify(e1) === JSON.stringify(e2)
    )) === true
);

const areSameStringArr = (arr1: string[], arr2: string[]) =>
    JSON.stringify(arr1) === JSON.stringify(arr2)
    ;


assert(
    [
        ["a", "b", "c"],
        ["a", "b", "c", "d"],
    ].reduce(...allEquals<string[]>(
        areSameStringArr
    )) === false
);

assert(
    [["foo", "bar"], ["foo", "bar"]].reduce(
        ...allEquals<string[]>(
            (e1, e2) => [e1, e2].map(e => JSON.stringify(e)).reduce(...allEquals())
        )
    ) === true
);


assert(areSameStringArr(
    ["foo", "foo", "bar", "baz"].reduce(...removeDuplicates<string>()),
    ["foo", "bar", "baz"]
));

assert(areSameStringArr(
    ["foo", "foo"].reduce(...removeDuplicates<string>()),
    ["foo"]
));

assert(areSameStringArr(
    ["foo", "foo", "bar", "bar"].reduce(...removeDuplicates<string>()),
    ["foo", "bar"]
));

assert(areSameStringArr(
    ["foo"].reduce(...removeDuplicates<string>()),
    ["foo"]
));

assert(areSameStringArr(
    [].reduce(...removeDuplicates<string>()),
    []
));

assert(
    JSON.stringify(
        [["a", "b", "c"], ["a", "b", "c", "d"], ["a", "b", "c"]].reduce(...removeDuplicates<string[]>(areSameStringArr))
    )
    ===
    JSON.stringify(
        [["a", "b", "c"], ["a", "b", "c", "d"]]
    )
);

{

    const [arr1, arr2] = (["FOO", "BAR", "FOO"] as const).reduce(...partition((e: "FOO" | "BAR"): e is "BAR" => e === "BAR"));

    assert(areSameStringArr(arr1, ["BAR"]));
    assert(areSameStringArr(arr2, ["FOO", "FOO"]));

}

{

    const [arr1, arr2] = arrPartition(["FOO", "BAR", "FOO"] as const, (e): e is "BAR" => e === "BAR");

    assert(areSameStringArr(arr1, ["BAR"]));
    assert(areSameStringArr(arr2, ["FOO", "FOO"]));

}

assert(["foo", "bar", "baz"].reduce(...allUniq()) === true);
assert([].reduce(...allUniq()) === true);
assert(["foo", "bar", "foo"].reduce(...allUniq()) === false);

{

    const check = (arr: string[]) => arr
        .reduce(...and<string>([
            arr => arr.length !== 0,
            arr => arr.reduce(...allUniq()),
            arr => !arr.reduce(...includes("me"))
        ]))
        ;

    assert(check(["alice", "bob", "louis"]) === true);
    assert(check([]) === false);
    assert(check(["alice", "bob", "alice", "louis"]) === false);
    assert(check(["alice", "bob", "louis", "me"]) === false);


}

assert(["foo", "bar", "baz", "hello"].reduce(...count<string>(e => e.startsWith("b"))) === 2);

assert(
    []
        .reduce(...or([
            arr => arr.length === 0,
            arr => arr.length >= 3
        ])) === true
);

assert(
    ["a", "b", "c", "d"]
        .reduce(...or([
            arr => arr.length === 0,
            arr => arr.length >= 3
        ])) === true
);

assert(
    ["a", "b"]
        .reduce(...or([
            arr => arr.length === 0,
            arr => arr.length >= 3
        ])) === false
);

assert(["a", "b"].reduce(...sameAs<string>(["a", "b"])) === true);
assert(["a", "b"].reduce(...sameAs<string>(["a", "bc"])) === false);
assert(["a", "b"].reduce(...sameAs<string>(["a", "b", "c"])) === false);

assert(
    same(
        ["bob", "alice"].reduce(...diff<string>(["bob", "louis"])),
        {
            "added": ["louis"],
            "removed": ["alice"]
        },
        { "takeIntoAccountArraysOrdering": false }
    )
);

console.log("PASS reducers");


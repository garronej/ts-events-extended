

import { sameFactory, same } from "./same.ts";
import { assert } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/assert.ts";
import { copy } from "./copy.ts";
import * as util from "https://deno.land/std@0.85.0/node/util.ts";

{

    const { same } = sameFactory({ "takeIntoAccountArraysOrdering": false });

    assert(
        same(
            new Set<string[]>([
                ["a", "b"],
                ["c", "d"]
            ]),
            new Set<string[]>([
                ["a", "b"],
                ["c", "d"]
            ])
        )
    );

    assert(
        same(
            new Set<string[]>([
                ["a", "b"],
                ["c", "d"]
            ]),
            new Set<string[]>([
                ["c", "d"],
                ["a", "b"]
            ])
        )
    );

    assert(
        same(
            new Set<string[]>([
                ["a", "b"],
                ["c", "d"]
            ]),
            new Set<string[]>([
                ["b", "a"],
                ["c", "d"]
            ])
        )
    );

    assert(
        same(
            new Set<string[]>([
                ["a", "b"],
                ["c", "d"]
            ]),
            new Set<string[]>([
                ["c", "d"],
                ["b", "a"]
            ])
        )
    );

    assert(
        !same(
            new Set<string[]>([
                ["a", "b", "c"],
                ["c", "d"]
            ]),
            new Set<string[]>([
                ["c", "d"],
                ["b", "a"]
            ])
        )
    );

}


{

    const { same } = sameFactory({ "takeIntoAccountArraysOrdering": true });

    assert(
        same(
            new Set<string[]>([
                ["a", "b"],
                ["c", "d"]
            ]),
            new Set<string[]>([
                ["a", "b"],
                ["c", "d"]
            ])
        )
    );

    assert(
        same(
            new Set<string[]>([
                ["a", "b"],
                ["c", "d"]
            ]),
            new Set<string[]>([
                ["c", "d"],
                ["a", "b"]
            ])
        )
    );

    assert(
        !same(
            new Set<string[]>([
                ["a", "b"],
                ["c", "d"]
            ]),
            new Set<string[]>([
                ["b", "a"],
                ["c", "d"]
            ])
        )
    );

    assert(
        !same(
            new Set<string[]>([
                ["a", "b"],
                ["c", "d"]
            ]),
            new Set<string[]>([
                ["c", "d"],
                ["b", "a"]
            ])
        )
    );

    assert(
        !same(
            new Set<string[]>([
                ["a", "b", "c"],
                ["c", "d"]
            ]),
            new Set<string[]>([
                ["c", "d"],
                ["b", "a"]
            ])
        )
    );

}

{

    const { same } = sameFactory({ "takeIntoAccountArraysOrdering": false });

    assert(
        same(
            new Map<string[], string[]>([
                [["a", "b"], ["1", "2"]],
                [["c", "d"], ["3", "4"]]
            ]),
            new Map<string[], string[]>([
                [["a", "b"], ["1", "2"]],
                [["c", "d"], ["3", "4"]]
            ]),
        )
    );

    assert(
        same(
            new Map<string[], string[]>([
                [["b", "a"], ["1", "2"]],
                [["c", "d"], ["3", "4"]]
            ]),
            new Map<string[], string[]>([
                [["a", "b"], ["1", "2"]],
                [["c", "d"], ["3", "4"]]
            ]),
        )
    );

    assert(
        same(
            new Map<string[], string[]>([
                [["c", "d"], ["3", "4"]],
                [["a", "b"], ["1", "2"]]
            ]),
            new Map<string[], string[]>([
                [["a", "b"], ["1", "2"]],
                [["c", "d"], ["3", "4"]]
            ]),
        )
    );

    assert(
        !same(
            new Map<string[], string[]>([
                [["a", "b"], ["1", "2"]],
                [["c", "d"], ["3", "4"]],
                [["e", "f"], ["5", "6"]],
            ]),
            new Map<string[], string[]>([
                [["a", "b"], ["1", "2"]],
                [["c", "d"], ["3", "4"]]
            ]),
        )
    );

    assert(
        !same(
            new Map<string[], string[]>([
                [["1", "2"], ["a", "b"]],
                [["c", "d"], ["3", "4"]]
            ]),
            new Map<string[], string[]>([
                [["a", "b"], ["1", "2"]],
                [["c", "d"], ["3", "4"]]
            ]),
        )
    );


}

{

    const { same } = sameFactory({ "takeIntoAccountArraysOrdering": true });

    assert(
        same(
            new Map<string[], string[]>([
                [["a", "b"], ["1", "2"]],
                [["c", "d"], ["3", "4"]]
            ]),
            new Map<string[], string[]>([
                [["a", "b"], ["1", "2"]],
                [["c", "d"], ["3", "4"]]
            ]),
        )
    );

    assert(
        !same(
            new Map<string[], string[]>([
                [["b", "a"], ["1", "2"]],
                [["c", "d"], ["3", "4"]]
            ]),
            new Map<string[], string[]>([
                [["a", "b"], ["1", "2"]],
                [["c", "d"], ["3", "4"]]
            ]),
        )
    );

    assert(
        same(
            new Map<string[], string[]>([
                [["c", "d"], ["3", "4"]],
                [["a", "b"], ["1", "2"]]
            ]),
            new Map<string[], string[]>([
                [["a", "b"], ["1", "2"]],
                [["c", "d"], ["3", "4"]]
            ]),
        )
    );

    assert(
        !same(
            new Map<string[], string[]>([
                [["a", "b"], ["1", "2"]],
                [["c", "d"], ["3", "4"]],
                [["e", "f"], ["5", "6"]],
            ]),
            new Map<string[], string[]>([
                [["a", "b"], ["1", "2"]],
                [["c", "d"], ["3", "4"]]
            ]),
        )
    );

    assert(
        !same(
            new Map<string[], string[]>([
                [["1", "2"], ["a", "b"]],
                [["c", "d"], ["3", "4"]]
            ]),
            new Map<string[], string[]>([
                [["a", "b"], ["1", "2"]],
                [["c", "d"], ["3", "4"]]
            ]),
        )
    );


}

{

    const obj: any = {};

    Object.assign(obj, { "p": obj });


    const clone: any = {};

    Object.assign(clone, { "p": clone });

    assert(same(obj, clone));

}

{

    const map1 = new Map<any, any>();
    const map2 = new Map<any, any>();

    map1.set({ "p": "foo" }, { "q": "bar" });
    map2.set({ "p": "foo" }, { "q": "bar" });

    map1.set({ "p": "baz" }, { "q": 44 });
    map2.set({ "p": "baz" }, { "q": 44 });

    map1.set(33, ["a", 33, new Date(12), new Set<any>(["a", [map1], 55])]);
    map2.set(33, ["a", 33, new Date(12), new Set<any>(["a", [map2], 55])]);

    assert(same(map1, map2));

}

{

    const map1 = new Map<any, any>();
    const map2 = new Map<any, any>();

    map1.set({ "p": "foo" }, { "q": "bar" });
    map2.set({ "p": "foo" }, { "q": "bar" });

    map1.set({ "p": "baz" }, { "q": 44 });
    map2.set({ "p": "baz" }, { "q": 44 });

    map1.set(33, ["a", 33, new Date(12), new Set<any>(["a", [map1], -1])]);
    map2.set(33, ["a", 33, new Date(12), new Set<any>(["a", [map2], 55])]);

    assert(!same(map1, map2));

}

{

    const map1 = new Map<any, any>();
    const map2 = new Map<any, any>();

    map1.set({ "p": "foo" }, { "q": "bar" });
    map2.set({ "p": "foo" }, { "q": "bar" });

    map1.set({ "p": "baz" }, { "q": 44 });
    map2.set({ "p": "baz" }, { "q": 44 });

    map1.set(33, ["a", 33, new Date(12), new Set<any>(["a", [map1], -1])]);
    map2.set(33, ["a", 33, new Date(12), new Set<any>(["a", [map2], 55])]);

    assert(!same(map1, map2));

}

{

    const map1 = new Map<any, any>();
    const map2 = new Map<any, any>();

    map1.set({ "p": "foo" }, { "q": "x" });
    map2.set({ "p": "foo" }, { "q": "bar" });

    map1.set({ "p": "baz" }, { "q": 44 });
    map2.set({ "p": "baz" }, { "q": 44 });

    map1.set(33, ["a", 33, new Date(12), new Set<any>(["a", [map1], 55])]);
    map2.set(33, ["a", 33, new Date(12), new Set<any>(["a", [map2], 55])]);

    assert(!same(map1, map2));

}

{

    const map1 = new Map<any, any>();
    const map2 = new Map<any, any>();

    map1.set({ "p": "foo" }, { "q": "bar" });
    map2.set({ "p": "foo" }, { "q": "bar" });

    map1.set({ "p": "baz" }, { "q": 44 });
    map2.set({ "p": "baz" }, { "q": 44 });

    map1.set(33, ["a", 33, new Date(13), new Set<any>(["a", [map1], 55])]);
    map2.set(33, ["a", 33, new Date(12), new Set<any>(["a", [map2], 55])]);

    assert(!same(map1, map2));

}




const obj: any = { "p1": "FOO", "p2": new Set(["a", "b", "c"]), "p3": ["a", "b"], "p4": undefined, "p5": null };

Object.assign(obj, { obj });

const s1 = util.inspect(obj);

const clone = copy(obj, { "freeze": true })

assert(same(obj, clone));

obj["p1"] = "changed";
obj["p2"].add("changed");
obj["p3"].push("changed");
obj["p4"] = "changed";
obj["p5"] = "changed";

assert(util.inspect(clone) === s1);

try {

    clone.p1 = "BAR";

    assert(false, "should have throw");

} catch {
}

console.log("PASS in depth");


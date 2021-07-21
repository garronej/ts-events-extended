import { Polyfill as Set } from "https://raw.githubusercontent.com/garronej/minimal_polyfills/v2.2.1/deno_dist/Set.ts";
import { MapLike, SetLike, DateLike, ArrayLike } from "./types.ts";
import { arrAllEquals } from "../reducers/allEquals.ts";
import "https://raw.githubusercontent.com/garronej/minimal_polyfills/v2.2.1/deno_dist/Object.is.ts";

/** 
 * Function that perform a in depth comparison of two things of arbitrary type T
 * to see if they represent the same date regardless of object references.
 * 
 * Think of it as JSON.stringify(o1) === JSON.stringify(o2)
 * but unlike a test performed with JSON.stringify the order in the property
 * have been assigned to an object does not matter and circular references are supported.
 * 
 *
 * If takeIntoAccountArraysOrdering === false then
 * representsSameData(["a", "b"], ["b", "a"]) will return true.
 * 
 * If Date are compared via .getTime()
 * 
 * The objects can includes Map and Set.
 * */
export const same = (() => {

    function sameRec<T>(
        o1: T,
        o2: T,
        { takeIntoAccountArraysOrdering }: { takeIntoAccountArraysOrdering: boolean } = { "takeIntoAccountArraysOrdering": true },
        o1Path: { key: string; obj: any; }[],
        o2Path: { key: string; obj: any; }[],
        o1RealRef: T = o1,
        o2RealRef: T = o2
    ): boolean {

        if (Object.is(o1, o2)) {
            return true;
        }

        {

            const i1 = o1Path.map(({ obj }) => obj).indexOf(o1RealRef);

            if (i1 >= 0) {

                const i2 = o2Path.map(({ obj }) => obj).indexOf(o2RealRef);

                if (i1 !== i2) {
                    return false;
                }

                return arrAllEquals(
                    [o1Path, o2Path]
                        .map(
                            oPath => oPath
                                .map(({ key }) => key)
                                .join("")
                        )
                );

            }


        }

        if (!(o1 instanceof Object && o1 instanceof Object)) {
            return false;
        }


        if (DateLike.match(o1)) {

            if (!DateLike.match(o2)) {
                return false;
            }

            return o1.getTime() === o2!.getTime();

        }


        if (MapLike.match<any, any>(o1)) {

            if (!MapLike.match<any, any>(o2)) {
                return false;
            }

            type Entry = { key: any, value: any };

            const newO1 = new Set<Entry>();
            const newO2 = new Set<Entry>();

            for (const o of [o1, o2]) {

                const newO = o === o1 ? newO1 : newO2;

                const arr = Array.from(o.keys());

                for (let i = 0; i < arr.length; i++) {

                    const key = arr[i];
                    const value = o.get(key)!;

                    newO.add({ key, value });

                }

            }

            return sameRec(
                newO1,
                newO2,
                { takeIntoAccountArraysOrdering },
                o1Path,
                o2Path,
                o1RealRef as any,
                o2RealRef
            );

        }

        let takeIntoAccountArraysOrderingOv: false | undefined = undefined;

        if (SetLike.match(o1)) {

            if (!SetLike.match(o2)) {
                return false;
            }

            o1 = Array.from(o1.values()) as any;
            o2 = Array.from(o2.values()) as any;

            takeIntoAccountArraysOrderingOv = false

        }

        if (ArrayLike.match<any>(o1)) {

            if (!ArrayLike.match<any>(o2)) {
                return false;
            }

            if (o1.length !== o2.length) {
                return false;
            }

            if (
                !(takeIntoAccountArraysOrderingOv !== undefined ?
                    takeIntoAccountArraysOrderingOv :
                    takeIntoAccountArraysOrdering)
            ) {

                const o2Set = new Set(Array.from(o2));

                for (let i = 0; i < o1.length; i++) {

                    if (!(`${i}` in o1)) {
                        continue;
                    }

                    const val1 = o1[i];

                    if (o2Set.has(val1)) {
                        o2Set.delete(val1);
                        continue;
                    }

                    let isFound = false;

                    for (const val2 of o2Set.values()) {

                        if (!sameRec(
                            val1,
                            val2,
                            { takeIntoAccountArraysOrdering },
                            [...o1Path, { "obj": o1RealRef, "key": "*" }],
                            [...o2Path, { "obj": o2RealRef, "key": "*" }]
                        )) {
                            continue;
                        }

                        isFound = true;
                        o2Set.delete(val2);
                        break;

                    }

                    if (!isFound) {
                        return false;
                    }

                }

                return true;

            }

            //continue

        } else if (!sameRec(
            Object.keys(o1).filter(key => (o1 as any)[key] !== undefined),
            Object.keys(o2).filter(key => (o2 as any)[key] !== undefined),
            { "takeIntoAccountArraysOrdering": false },
            [],
            []
        )) {
            return false
        }

        for (const key in o1) {

            if (!sameRec(
                o1[key],
                o2[key],
                { takeIntoAccountArraysOrdering },
                [...o1Path, { "obj": o1RealRef, key }],
                [...o2Path, { "obj": o2RealRef, key }]
            )) {
                return false;
            }

        }

        return true;


    }

    return function same<T>(
        o1: T,
        o2: T,
        { takeIntoAccountArraysOrdering }: { takeIntoAccountArraysOrdering: boolean } = { "takeIntoAccountArraysOrdering": true },
    ): boolean {
        return sameRec(o1, o2, { takeIntoAccountArraysOrdering }, [], []);
    }

})();


/** 
 * Return the "same" function with "takeIntoAccountArraysOrdering" default value set as desired.
 * */
export function sameFactory({ takeIntoAccountArraysOrdering }: { takeIntoAccountArraysOrdering: boolean; }) {
    return {
        "same": <T>(
            o1: T,
            o2: T,
            prop: { takeIntoAccountArraysOrdering: boolean } = { takeIntoAccountArraysOrdering },
        ) => same(o1, o2, prop)
    }
}

import { ReduceArguments, toReduceArguments } from "./reduceify.ts";
import { contains } from "./contains.ts";
import { removeDuplicates } from "./removeDuplicates.ts";
import { id } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/id.ts";

export type ArrDiff<T> = {
    added: readonly T[];
    removed: readonly T[];
}

const areStrictEqual = (e1: unknown, e2: unknown) => e1 === e2;

/** WARNING: Providing areEquals significantly impact performances */
export function arrDiff<ArrOf>(
    arr: readonly ArrOf[],
    newArr: readonly ArrOf[],
    areEquals: (e1: ArrOf, e2: ArrOf) => boolean = areStrictEqual
): ArrDiff<ArrOf> {

    const arrDiff = {
        "added": id<ArrOf[]>([]),
        "removed": id<ArrOf[]>([])
    };

    if (
        arr.length === newArr.length &&
        arr.every((elem, i) => areEquals(elem, newArr[i]))
    ) {
        return arrDiff;
    }

    if (areEquals !== areStrictEqual) {

        return {
            "added": newArr
                .reduce(...removeDuplicates<ArrOf>(areEquals))
                .filter(newEntry => !arr.reduce(...contains<ArrOf>(entry => areEquals(entry, newEntry)))),
            "removed": arr
                .reduce(...removeDuplicates<ArrOf>(areEquals))
                .filter(entry => !newArr.reduce(...contains<ArrOf>(newEntry => areEquals(newEntry, entry))))
        };

    }

    const arrAsSet = new Set<ArrOf>(arr);
    const newArrAsSet = new Set(newArr);

    arrAsSet.forEach(elem => {

        if (newArrAsSet.has(elem)) {
            return;
        }

        arrDiff.removed.push(elem);

    });

    newArrAsSet.forEach(elem => {

        if (arrAsSet.has(elem)) {
            return;
        }

        arrDiff.added.push(elem);

    });

    return arrDiff;

}

export function diff<ArrOf>(
    newArr: readonly ArrOf[],
    areEquals?: (e1: ArrOf, e2: ArrOf) => boolean
): ReduceArguments<ArrOf, ArrDiff<ArrOf>> {
    return toReduceArguments(arrDiff, newArr, areEquals);
}

export function diffFactory({ areEquals }: { areEquals: <T>(e1: T, e2: T) => boolean; }) {
    return { "diff": <ArrOf>(newArr: readonly ArrOf[]) => diff<ArrOf>(newArr, areEquals) };
}

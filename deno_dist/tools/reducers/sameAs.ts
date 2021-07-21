import { allEquals } from "./allEquals.ts";
import { ReduceArguments, toReduceArguments } from "./reduceify.ts";

export function arrSameAs<ArrOf>(
    arr: readonly ArrOf[],
    otherArr: readonly ArrOf[],
    areSame: (e1: ArrOf, e2: ArrOf) => boolean = (e1, e2) => e1 === e2
): boolean {

    if (![arr, otherArr]
        .map(({ length }) => length)
        .reduce(...allEquals())
    ) {
        return false;
    }

    for (let i = 0; i < arr.length; i++) {
        if (!areSame(arr[i], otherArr[i])) {
            return false;
        }
    }

    return true;

}

export function sameAs<ArrOf>(
    otherArr: readonly ArrOf[],
    areSame?: (e1: ArrOf, e2: ArrOf) => boolean
): ReduceArguments<ArrOf, boolean> {
    return toReduceArguments(arrSameAs, otherArr, areSame);
}


export function sameAsFactory({ areEquals }: { areEquals: <T>(e1: T, e2: T) => boolean; }) {
    return { "sameAs": <ArrOf>(otherArr: readonly ArrOf[]) => sameAs<ArrOf>(otherArr, areEquals) };
}

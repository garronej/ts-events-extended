
import { toReduceArguments, ReduceArguments } from "./reduceify.ts";
import { every } from "./every.ts";


export function arrAllEqualsTo<ArrOf>(
    arr: readonly ArrOf[],
    to: ArrOf,
    areEquals: (e: ArrOf, to: ArrOf) => boolean = (e, to) => e === to
): boolean {
    return arr.reduce(...every<ArrOf>(e => areEquals(e, to)));
};

export function allEqualsTo<ArrOf>(
    to: ArrOf,
    areEquals?: (e: ArrOf, to: ArrOf) => boolean
): ReduceArguments<ArrOf, boolean> {
    return toReduceArguments(arrAllEqualsTo, to, areEquals);
}

export function allEqualsToFactory({ areEquals }: { areEquals: <T>(e: T, to: T) => boolean }) {
    return { "allEqualsTo": <ArrOf>(to: ArrOf) => allEqualsTo<ArrOf>(to, areEquals) };
}
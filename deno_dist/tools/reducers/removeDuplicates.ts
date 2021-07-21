
import { allEqualsTo } from "./allEqualsTo.ts";
import { ReduceArguments, toReduceArguments } from "./reduceify.ts";

export function arrRemoveDuplicates<ArrOf>(
    arr: readonly ArrOf[],
    areEquals: (e1: ArrOf, e2: ArrOf) => boolean = (e1, e2) => e1 === e2
): ArrOf[] {

    return arr.reduce<ArrOf[]>(
        (prev, curr) => [
            ...prev,
            ...prev
                .map(e => areEquals(curr, e))
                .reduce(...allEqualsTo(false)) ?
                [curr] : []
        ],
        []
    );
}

export function removeDuplicates<ArrOf>(
    areEquals?: (e1: ArrOf, e2: ArrOf) => boolean
): ReduceArguments<ArrOf, ArrOf[]> {
    return toReduceArguments(arrRemoveDuplicates, areEquals);
}

export function removeDuplicatesFactory({ areEquals }: { areEquals: <T>(e1: T, e2: T) => boolean; }) {
    return { "removeDuplicates": <ArrOf>() => removeDuplicates<ArrOf>(areEquals) };
}
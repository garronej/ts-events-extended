
import { allEqualsTo } from "./allEqualsTo.ts";
import { ReduceArguments, toReduceArguments } from "./reduceify.ts";

export function arrAllEquals<ArrOf>(
    arr: readonly ArrOf[],
    areEquals: (e1: ArrOf, e2: ArrOf) => boolean = (e1, e2) => e1 === e2
): boolean {

    if (arr.length === 0) {
        return true;
    }

    return arr.reduce(...allEqualsTo(arr[0], areEquals));

};

export function allEquals<ArrOf>(
    areEquals?: (e1: ArrOf, e2: ArrOf) => boolean
): ReduceArguments<ArrOf, boolean> {
    return toReduceArguments(arrAllEquals, areEquals);
}

export function allEqualsFactory({ areEquals }: { areEquals: <T>(e1: T, e2: T) => boolean; }) {
    return { "allEquals": <ArrOf>()=> allEquals<ArrOf>(areEquals) };
}
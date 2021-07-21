
import { ReduceArguments, toReduceArguments } from "./reduceify.ts";

export function arrIncludes<ArrOf>(arr: readonly ArrOf[], e: ArrOf): boolean {
    return arr.indexOf(e) >= 0;
}

export function includes<ArrOf>(e: ArrOf): ReduceArguments<ArrOf, boolean> {
    return toReduceArguments(arrIncludes, e);
}
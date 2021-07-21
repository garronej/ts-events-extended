import { ReduceArguments, toReduceArguments } from "./reduceify.ts";

export function arrAnd<ArrOf>(
    arr: readonly ArrOf[],
    conditions: ((arr: readonly ArrOf[]) => boolean)[]
): boolean {
    return !conditions.find(condition => !condition(arr));
}

export function and<ArrOf>(
    conditions: ((arr: readonly ArrOf[]) => boolean)[]
): ReduceArguments<ArrOf, boolean> {
    return toReduceArguments(arrAnd, conditions);
}

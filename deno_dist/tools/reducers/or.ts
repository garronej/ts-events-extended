import { ReduceArguments, toReduceArguments } from "./reduceify.ts";

export function arrOr<ArrOf>(
    arr: readonly ArrOf[],
    conditions: ((arr: readonly ArrOf[]) => boolean)[]
): boolean {

    return !!conditions.find(condition => condition(arr));

}

export function or<ArrOf>(
    conditions: ((arr: readonly ArrOf[]) => boolean)[]
): ReduceArguments<ArrOf, boolean> {
    return toReduceArguments(arrOr, conditions);
}
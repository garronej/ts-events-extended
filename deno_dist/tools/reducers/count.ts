import { toReduceArguments, ReduceArguments } from "./reduceify.ts";

export function arrCount<ArrOf>(
    arr: readonly ArrOf[],
    matcher: (e: ArrOf) => boolean
): number {

    return arr
        .map(e => matcher(e) ? 1 : 0)
        .reduce<number>((prev, curr) => prev + curr, 0)
        ;

}


export function count<ArrOf>(
    matcher: (e: ArrOf) => boolean
): ReduceArguments<ArrOf, number> {
    return toReduceArguments(arrCount, matcher);
}

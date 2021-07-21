import { ReduceArguments, toReduceArguments } from "./reduceify.ts";

export function arrEvery<ArrOf>(
    arr: readonly ArrOf[],
    test: (e: ArrOf) => boolean = e => !!e
): boolean {

    return arr
        .map(e => test(e))
        .reduce<boolean>((prev, curr) => curr && prev, true)
        ;

}

export function every<ArrOf>(test?: (e: ArrOf) => boolean): ReduceArguments<ArrOf, boolean> {
    return toReduceArguments(arrEvery, test);
}
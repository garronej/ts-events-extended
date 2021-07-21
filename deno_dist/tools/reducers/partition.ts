import { assert } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/assert.ts";
import { is } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/is.ts";
import { ReduceArguments, toReduceArguments } from "./reduceify.ts";

function arrPartitionImpl<ArrOf, U extends ArrOf>(
    arr: readonly ArrOf[],
    matcher: (entry: ArrOf) => entry is U
): [U[], Exclude<ArrOf, U>[]] {

    return arr.reduce<[U[], Exclude<ArrOf, U>[]]>((previousValue, currentValue) => {

        if (matcher(currentValue)) {

            previousValue[0].push(currentValue);

        } else {

            //NOTE: Should be deduced by the compiler
            assert(is<Exclude<ArrOf, U>>(currentValue));

            previousValue[1].push(currentValue);

        }

        return previousValue;

    }, [[], []]);

}

export function arrPartition<ArrOf, U extends ArrOf>(arr: readonly ArrOf[], matcher: (entry: ArrOf) => entry is U): [U[], Exclude<ArrOf, U>[]];
export function arrPartition<ArrOf>(arr: readonly ArrOf[], matcher: (entry: ArrOf) => boolean): [ArrOf[], ArrOf[]];
export function arrPartition<ArrOf>(arr: readonly ArrOf[], matcher: (entry: ArrOf) => boolean): [ArrOf[], ArrOf[]] {
    return arrPartitionImpl(arr, (entry: ArrOf): entry is ArrOf => matcher(entry));
}

export function partition<ArrOf, U extends ArrOf>(
    matcher: (entry: ArrOf) => entry is U
): ReduceArguments<ArrOf, [U[], Exclude<ArrOf, U>[]]>;
export function partition<ArrOf>(
    matcher: (entry: ArrOf) => boolean
): ReduceArguments<ArrOf, [ArrOf[], ArrOf[]]>;
export function partition<ArrOf>(
    matcher: (entry: ArrOf) => boolean
): ReduceArguments<ArrOf, [ArrOf[], ArrOf[]]> | ReduceArguments<ArrOf, [any[], Exclude<ArrOf, any>[]]> {
    return toReduceArguments<ArrOf, [ArrOf[], ArrOf[]], [(entry: ArrOf) => boolean]>(arrPartition, matcher);
}
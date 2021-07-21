import { ReduceArguments } from "./reduceify";
export declare function arrPartition<ArrOf, U extends ArrOf>(arr: readonly ArrOf[], matcher: (entry: ArrOf) => entry is U): [U[], Exclude<ArrOf, U>[]];
export declare function arrPartition<ArrOf>(arr: readonly ArrOf[], matcher: (entry: ArrOf) => boolean): [ArrOf[], ArrOf[]];
export declare function partition<ArrOf, U extends ArrOf>(matcher: (entry: ArrOf) => entry is U): ReduceArguments<ArrOf, [U[], Exclude<ArrOf, U>[]]>;
export declare function partition<ArrOf>(matcher: (entry: ArrOf) => boolean): ReduceArguments<ArrOf, [ArrOf[], ArrOf[]]>;

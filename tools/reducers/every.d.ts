import { ReduceArguments } from "./reduceify";
export declare function arrEvery<ArrOf>(arr: readonly ArrOf[], test?: (e: ArrOf) => boolean): boolean;
export declare function every<ArrOf>(test?: (e: ArrOf) => boolean): ReduceArguments<ArrOf, boolean>;

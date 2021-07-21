import { ReduceArguments } from "./reduceify";
export declare function arrCount<ArrOf>(arr: readonly ArrOf[], matcher: (e: ArrOf) => boolean): number;
export declare function count<ArrOf>(matcher: (e: ArrOf) => boolean): ReduceArguments<ArrOf, number>;

import { ReduceArguments } from "./reduceify";
export declare function arrContains<ArrOf>(arr: readonly ArrOf[], matcher: (e: ArrOf) => boolean): boolean;
export declare function contains<ArrOf>(matcher: (e: ArrOf) => boolean): ReduceArguments<ArrOf, boolean>;

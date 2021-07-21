import { ReduceArguments } from "./reduceify";
export declare function arrOr<ArrOf>(arr: readonly ArrOf[], conditions: ((arr: readonly ArrOf[]) => boolean)[]): boolean;
export declare function or<ArrOf>(conditions: ((arr: readonly ArrOf[]) => boolean)[]): ReduceArguments<ArrOf, boolean>;

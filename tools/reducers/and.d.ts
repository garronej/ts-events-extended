import { ReduceArguments } from "./reduceify";
export declare function arrAnd<ArrOf>(arr: readonly ArrOf[], conditions: ((arr: readonly ArrOf[]) => boolean)[]): boolean;
export declare function and<ArrOf>(conditions: ((arr: readonly ArrOf[]) => boolean)[]): ReduceArguments<ArrOf, boolean>;

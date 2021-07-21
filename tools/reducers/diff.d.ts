import { ReduceArguments } from "./reduceify";
export declare type ArrDiff<T> = {
    added: readonly T[];
    removed: readonly T[];
};
/** WARNING: Providing areEquals significantly impact performances */
export declare function arrDiff<ArrOf>(arr: readonly ArrOf[], newArr: readonly ArrOf[], areEquals?: (e1: ArrOf, e2: ArrOf) => boolean): ArrDiff<ArrOf>;
export declare function diff<ArrOf>(newArr: readonly ArrOf[], areEquals?: (e1: ArrOf, e2: ArrOf) => boolean): ReduceArguments<ArrOf, ArrDiff<ArrOf>>;
export declare function diffFactory({ areEquals }: {
    areEquals: <T>(e1: T, e2: T) => boolean;
}): {
    diff: <ArrOf>(newArr: readonly ArrOf[]) => ReduceArguments<ArrOf, ArrDiff<ArrOf>>;
};

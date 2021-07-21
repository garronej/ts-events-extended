import { ReduceArguments } from "./reduceify";
export declare function arrAllEqualsTo<ArrOf>(arr: readonly ArrOf[], to: ArrOf, areEquals?: (e: ArrOf, to: ArrOf) => boolean): boolean;
export declare function allEqualsTo<ArrOf>(to: ArrOf, areEquals?: (e: ArrOf, to: ArrOf) => boolean): ReduceArguments<ArrOf, boolean>;
export declare function allEqualsToFactory({ areEquals }: {
    areEquals: <T>(e: T, to: T) => boolean;
}): {
    allEqualsTo: <ArrOf>(to: ArrOf) => ReduceArguments<ArrOf, boolean>;
};

import { ReduceArguments } from "./reduceify";
export declare function arrAllUniq<ArrOf>(arr: readonly ArrOf[], areEquals?: (e1: ArrOf, e2: ArrOf) => boolean): boolean;
export declare function allUniq<ArrOf>(areEquals?: (e1: ArrOf, e2: ArrOf) => boolean): ReduceArguments<ArrOf, boolean>;
export declare function allUniqFactory({ areEquals }: {
    areEquals: <T>(e1: T, e2: T) => boolean;
}): {
    allUniq: <ArrOf>() => ReduceArguments<ArrOf, boolean>;
};

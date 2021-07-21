import { ReduceArguments } from "./reduceify";
export declare function arrAllEquals<ArrOf>(arr: readonly ArrOf[], areEquals?: (e1: ArrOf, e2: ArrOf) => boolean): boolean;
export declare function allEquals<ArrOf>(areEquals?: (e1: ArrOf, e2: ArrOf) => boolean): ReduceArguments<ArrOf, boolean>;
export declare function allEqualsFactory({ areEquals }: {
    areEquals: <T>(e1: T, e2: T) => boolean;
}): {
    allEquals: <ArrOf>() => ReduceArguments<ArrOf, boolean>;
};

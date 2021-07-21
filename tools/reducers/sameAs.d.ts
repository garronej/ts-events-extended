import { ReduceArguments } from "./reduceify";
export declare function arrSameAs<ArrOf>(arr: readonly ArrOf[], otherArr: readonly ArrOf[], areSame?: (e1: ArrOf, e2: ArrOf) => boolean): boolean;
export declare function sameAs<ArrOf>(otherArr: readonly ArrOf[], areSame?: (e1: ArrOf, e2: ArrOf) => boolean): ReduceArguments<ArrOf, boolean>;
export declare function sameAsFactory({ areEquals }: {
    areEquals: <T>(e1: T, e2: T) => boolean;
}): {
    sameAs: <ArrOf>(otherArr: readonly ArrOf[]) => ReduceArguments<ArrOf, boolean>;
};

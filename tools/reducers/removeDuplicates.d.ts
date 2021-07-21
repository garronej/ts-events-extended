import { ReduceArguments } from "./reduceify";
export declare function arrRemoveDuplicates<ArrOf>(arr: readonly ArrOf[], areEquals?: (e1: ArrOf, e2: ArrOf) => boolean): ArrOf[];
export declare function removeDuplicates<ArrOf>(areEquals?: (e1: ArrOf, e2: ArrOf) => boolean): ReduceArguments<ArrOf, ArrOf[]>;
export declare function removeDuplicatesFactory({ areEquals }: {
    areEquals: <T>(e1: T, e2: T) => boolean;
}): {
    removeDuplicates: <ArrOf>() => ReduceArguments<ArrOf, ArrOf[]>;
};

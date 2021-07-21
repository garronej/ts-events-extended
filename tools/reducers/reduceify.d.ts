export declare type ReduceCallbackFunction<ArrOf, ReduceTo> = (previousValue: ReduceTo, currentValue: ArrOf, currentIndex: number, array: readonly ArrOf[]) => ReduceTo;
export declare type ReduceArguments<ArrOf, ReduceTo> = [ReduceCallbackFunction<ArrOf, ReduceTo>, ReduceTo];
export declare function toReduceArguments<ArrOf, ReduceTo, Params extends any[]>(arrOp: (arr: readonly ArrOf[], ...params: Params) => ReduceTo, ...params: Params): ReduceArguments<ArrOf, ReduceTo>;

declare type SetLike<T> = {
    values: () => Iterable<T>;
};
export declare namespace SetLike {
    function match<T>(set: Object): set is SetLike<T>;
}
export declare type MapLike<T, U> = {
    keys: () => Iterable<T>;
    get(key: T): U | undefined;
};
export declare namespace MapLike {
    function match<T, U>(map: Object): map is MapLike<T, U>;
}
export declare namespace ArrayLike {
    function match<T>(arr: Object): arr is ArrayLike<T>;
}
export declare type DateLike = {
    getTime: () => number;
};
export declare namespace DateLike {
    function match(date: Object): date is DateLike;
}
export {};

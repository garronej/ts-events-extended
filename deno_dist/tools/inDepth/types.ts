import { typeGuard } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/typeGuard.ts";
import { getPrototypeChain } from "./getPrototypeChain.ts";

type SetLike<T> = {
    values: () => Iterable<T>;
};


export namespace SetLike {

    export function match<T>(set: Object): set is SetLike<T> {
        return (
            typeGuard<SetLike<T>>(set, true) &&
            typeof set.values === "function" &&
            getPrototypeChain.isMatched(set, /Set/)
        );
    }

}

export type MapLike<T, U> = {
    keys: () => Iterable<T>;
    get(key: T): U | undefined;
};

export namespace MapLike {

    export function match<T, U>(map: Object): map is MapLike<T, U> {
        return (
            typeGuard<MapLike<T, U>>(map, true) &&
            typeof map.keys === "function" &&
            typeof map.get === "function" &&
            getPrototypeChain.isMatched(map, /Map/)
        );
    }

}

export namespace ArrayLike {

    export function match<T>(arr: Object): arr is ArrayLike<T> {
        return (
            typeGuard<ArrayLike<T>>(arr, true) &&
                typeof arr.length === "number" &&
                arr.length !== 0 ?
                (`${arr.length - 1}` in arr) :
                getPrototypeChain.isMatched(arr, /Array/)
        );
    }

}


export type DateLike = {
    getTime: ()=> number;
}

export namespace DateLike {

    export function match(date: Object): date is DateLike {
        return (
            typeGuard<DateLike>(date, true) &&
            typeof date.getTime === "function" &&
            getPrototypeChain.isMatched(date, /Date/)
        )
    }

}


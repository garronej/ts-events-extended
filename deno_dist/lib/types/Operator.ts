
/** https://docs.evt.land/api/operator */
export type Operator<T, U> =
    Operator.fλ<T, U> |
    ((data: U) => boolean) | //Filter
    (U extends T ? (data: T) => data is U : never) //Type guard
    ;

export namespace Operator {

    export type fλ<T, U> =
        fλ.Stateless<T, U> |
        fλ.Stateful<T, U>
        ;

    export namespace fλ {

        export type Stateless<T, U> = (data: T, registerSideEffect: (sideEffect: () => void) => void) => readonly [U] | null;

        export type Stateful<T, U> = [
            (data: T, prev: U, registerSideEffect: (sideEffect: () => void)=> void) => readonly [U] | null,
            U //Seed
        ];

    }

    export type Stateless<T, U> =
        fλ.Stateless<T, U> |
        ((data: U) => boolean) |
        (U extends T ? (data: T) => data is U : never)
        ;

}

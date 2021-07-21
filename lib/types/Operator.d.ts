/** https://docs.evt.land/api/operator */
export declare type Operator<T, U> = Operator.fλ<T, U> | ((data: U) => boolean) | //Filter
(U extends T ? (data: T) => data is U : never);
export declare namespace Operator {
    type fλ<T, U> = fλ.Stateless<T, U> | fλ.Stateful<T, U>;
    namespace fλ {
        type Stateless<T, U> = (data: T, registerSideEffect: (sideEffect: () => void) => void) => readonly [U] | null;
        type Stateful<T, U> = [
            (data: T, prev: U, registerSideEffect: (sideEffect: () => void) => void) => readonly [U] | null,
            U
        ];
    }
    type Stateless<T, U> = fλ.Stateless<T, U> | ((data: U) => boolean) | (U extends T ? (data: T) => data is U : never);
}

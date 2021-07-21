import "minimal-polyfills/Object.is";
/**
 * Function that perform a in depth comparison of two things of arbitrary type T
 * to see if they represent the same date regardless of object references.
 *
 * Think of it as JSON.stringify(o1) === JSON.stringify(o2)
 * but unlike a test performed with JSON.stringify the order in the property
 * have been assigned to an object does not matter and circular references are supported.
 *
 *
 * If takeIntoAccountArraysOrdering === false then
 * representsSameData(["a", "b"], ["b", "a"]) will return true.
 *
 * If Date are compared via .getTime()
 *
 * The objects can includes Map and Set.
 * */
export declare const same: <T>(o1: T, o2: T, { takeIntoAccountArraysOrdering }?: {
    takeIntoAccountArraysOrdering: boolean;
}) => boolean;
/**
 * Return the "same" function with "takeIntoAccountArraysOrdering" default value set as desired.
 * */
export declare function sameFactory({ takeIntoAccountArraysOrdering }: {
    takeIntoAccountArraysOrdering: boolean;
}): {
    same: <T>(o1: T, o2: T, prop?: {
        takeIntoAccountArraysOrdering: boolean;
    }) => boolean;
};

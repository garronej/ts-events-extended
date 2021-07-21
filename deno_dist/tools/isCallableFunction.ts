
/** NOTE: constructors are of type "function" but are not callable,
 * without the new keyword.
 * This function will return true if and only if the object passed is 
 * a function and it is not a constructor.
 */
export function isCallableFunction(o: any): boolean {

    if (typeof o !== "function") {
        return false;
    }

    const prototype = o["prototype"];

    if (!prototype) return true;

    let methods = Object.getOwnPropertyNames(prototype);

    if (methods.length !== 1) return false;

    let name: string = o.name;

    if (!name) return true;

    if (name[0].toUpperCase() === name[0]) return false;

    return true;

}
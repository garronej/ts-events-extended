
export function getPrototypeChain(obj: Object, callback?: (proto: Object) => boolean): Object[] {

    const proto = Object.getPrototypeOf(obj);

    if (!proto) {
        return [];
    }

    const doContinue = callback?.(proto);

    if (!doContinue) {
        return [proto]
    }

    return [proto, ...getPrototypeChain(proto)];

}
getPrototypeChain.isMatched = (obj: Object, regExp: RegExp): boolean => {

    let out = false;

    getPrototypeChain(
        obj,
        ({ constructor }) => {
            out = regExp.test(constructor.name);
            return !out;
        }
    );

    return out;


};




import React from "https://dev.jspm.io/react@16.14.0";;
const { useRef } = React;

export function useSemanticGuaranteeMemo<T>(
    fn: () => T, 
    deps: React.DependencyList
): T {

    const ref = useRef<{ v: T; prevDeps: any[]; }>()

    if (
        !ref.current ||
        deps.length !== ref.current.prevDeps.length ||
        ref.current.prevDeps.map((v, i) => v === deps[i]).indexOf(false) >= 0
    ) {
        ref.current = {
            "v": fn(),
            "prevDeps": [...deps]
        };
    }

    return ref.current.v;

}
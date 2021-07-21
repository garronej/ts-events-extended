import React from "https://dev.jspm.io/react@16.14.0";;
const { useEffect, useRef } = React;

import { Evt } from "../lib/Evt.ts";
import type { Ctx } from "../lib/index.ts";
import { useSemanticGuaranteeMemo } from "../tools/hooks/useSemanticGuaranteeMemo.ts";

//TODO: Find a more reliable way to test if <React.UseStrict> is used.
const isDevStrictMode = typeof process !== "object" ?
    false :
    (process?.env?.NODE_ENV ?? "production") !== "production"
    ;

/**
 * https://docs.evt.land/api/react-hooks
 * 
 * Provide a Ctx to attach handlers.
 * You should list in deps all the Evt that are
 * susceptible to change ( Evt passed as props 
 * or Evt that are react states ) that you use in the
 * factoryOrEffect callback. 
 * As for useEffect you should also list every other
 * value that you use.
 * Whenever any value in deps is changed factoryOrEffect
 * is invoked again with the new Evt and the previous handler
 * get detached.
 * All handler are also detached when the component unmount.
 * 
 * factoryOrEffect can be used for attaching handler to event
 * or to generate a new event that is a merge/pipe of other 
 * Evts.
 * c
 * BE AWARE: Unlike useEffect factoryOrEffect is called 
 * on render ( like useMemo's callback ).
 * 
 * Demo: https://stackblitz.com/edit/evt-useevt?file=index.tsx
 */
export function useEvt<T>(
    factoryOrEffect: (ctx: Ctx) => T,
    deps: React.DependencyList
): T {

    //const [ ctx ] = useState(() => Evt.newCtx());

    const ctxRef = useRef<Ctx>(null as any);

    const out = useSemanticGuaranteeMemo(() => {

        ctxRef.current?.done();

        ctxRef.current = Evt.newCtx();

        return factoryOrEffect(ctxRef.current);

    }, deps);

    useEffect(() => () => { ctxRef.current.done(); }, []);

    useClearCtxIfReactStrictModeInspectRun(isDevStrictMode, ctxRef);

    return out;

}

/**
 * When <React.StrictMode> is used in development
 * useState and useMemo get triggered a first time on a 
 * separate component instance but useEffect is not invoked.
 * 
 * To prevent leaving handlers that we attached inside the useMemo
 * callback we clear the context if useEffect(f,[])
 * is not invoked right after useState(f).
 */
function useClearCtxIfReactStrictModeInspectRun(
    isDevStrictMode: boolean, 
    ctxRef: React.MutableRefObject<Ctx>
) {

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useSemanticGuaranteeMemo(() => {

        if (!isDevStrictMode) {
            return;
        }

        timerRef.current = setTimeout(
            () => ctxRef.current.done(),
            700
        );

    }, []);

    useEffect(() => {

        if (!isDevStrictMode) {
            return;
        }

        if (timerRef.current === null) {
            return;
        }

        clearTimeout(timerRef.current);

    }, []);

}

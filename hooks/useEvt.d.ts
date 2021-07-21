import * as React from "react";
import type { Ctx } from "../lib";
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
export declare function useEvt<T>(factoryOrEffect: (ctx: Ctx) => T, deps: React.DependencyList): T;

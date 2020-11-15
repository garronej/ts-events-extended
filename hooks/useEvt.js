"use strict";
exports.__esModule = true;
exports.useEvt = void 0;
var React = require("react");
var useEffect = React.useEffect;
var lib_1 = require("../lib");
var safeSetTimeout_1 = require("../tools/safeSetTimeout");
var useSemanticGuaranteeMemo_1 = require("../tools/hooks/useSemanticGuaranteeMemo");
//TODO: Find a more reliable way to test if <React.UseStrict> is used.
var isDevStrictMode = process.env.NODE_ENV !== "production";
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
 *
 * BE AWARE: Unlike useEffect factoryOrEffect is called
 * on render ( like useMemo's callback ).
 */
function useEvt(factoryOrEffect, deps) {
    var ctx = useSemanticGuaranteeMemo_1.useSemanticGuaranteeMemo(function () { return lib_1.Evt.newCtx(); }, []);
    var out = useSemanticGuaranteeMemo_1.useSemanticGuaranteeMemo(function () {
        ctx.done();
        return factoryOrEffect(ctx);
    }, deps);
    useEffect(function () { return function () { ctx.done(); }; }, []);
    useHackStrictMode(isDevStrictMode, ctx);
    return out;
}
exports.useEvt = useEvt;
/**
 * When <React.StrictMode> is used in development
 * useState and useMemo get triggered a first time on a
 * separate component instance but useEffect is not invoked.
 *
 * To prevent leaving handlers that we attached inside the useMemo
 * callback we clear the context if useEffect(f,[])
 * is not invoked right after useState(f).
 */
function useHackStrictMode(isDevStrictMode, ctx) {
    var timer = undefined;
    useSemanticGuaranteeMemo_1.useSemanticGuaranteeMemo(function () {
        if (!isDevStrictMode) {
            return;
        }
        timer = safeSetTimeout_1.safeSetTimeout(function () { return ctx.done(); }, 700);
    }, []);
    useEffect(function () {
        if (!isDevStrictMode) {
            return;
        }
        if (timer === undefined) {
            return;
        }
        safeSetTimeout_1.safeClearTimeout(timer);
    }, []);
}
//# sourceMappingURL=useEvt.js.map
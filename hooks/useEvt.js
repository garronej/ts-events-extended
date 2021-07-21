"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEvt = void 0;
var React = require("react");
var useEffect = React.useEffect, useRef = React.useRef;
var Evt_2 = require("../lib/Evt");
var useSemanticGuaranteeMemo_1 = require("../tools/hooks/useSemanticGuaranteeMemo");
//TODO: Find a more reliable way to test if <React.UseStrict> is used.
var isDevStrictMode = typeof process !== "object" ?
    false :
    ((_b = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.NODE_ENV) !== null && _b !== void 0 ? _b : "production") !== "production";
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
function useEvt(factoryOrEffect, deps) {
    //const [ ctx ] = useState(() => Evt.newCtx());
    var ctxRef = useRef(null);
    var out = useSemanticGuaranteeMemo_1.useSemanticGuaranteeMemo(function () {
        var _a;
        (_a = ctxRef.current) === null || _a === void 0 ? void 0 : _a.done();
        ctxRef.current = Evt_2.Evt.newCtx();
        return factoryOrEffect(ctxRef.current);
    }, deps);
    useEffect(function () { return function () { ctxRef.current.done(); }; }, []);
    useClearCtxIfReactStrictModeInspectRun(isDevStrictMode, ctxRef);
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
function useClearCtxIfReactStrictModeInspectRun(isDevStrictMode, ctxRef) {
    var timerRef = useRef(null);
    useSemanticGuaranteeMemo_1.useSemanticGuaranteeMemo(function () {
        if (!isDevStrictMode) {
            return;
        }
        timerRef.current = setTimeout(function () { return ctxRef.current.done(); }, 700);
    }, []);
    useEffect(function () {
        if (!isDevStrictMode) {
            return;
        }
        if (timerRef.current === null) {
            return;
        }
        clearTimeout(timerRef.current);
    }, []);
}
//# sourceMappingURL=useEvt.js.map
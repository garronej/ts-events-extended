import type { Ctx } from "./Ctx";
import type { Evt } from "./Evt";
import type { StatefulEvt } from "./StatefulEvt";
/** Manually handling circular import so React Native does not gives warning. */
export declare const importProxy: {
    Ctx: typeof Ctx;
    Evt: typeof Evt;
    StatefulEvt: typeof StatefulEvt;
};

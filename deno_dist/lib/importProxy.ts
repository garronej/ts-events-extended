
import type { Ctx } from "./Ctx.ts";
import type { Evt } from "./Evt.ts";
import type { StatefulEvt } from "./StatefulEvt.ts";

/** Manually handling circular import so React Native does not gives warning. */
export const importProxy: {
    Ctx: typeof Ctx;
    Evt: typeof Evt;
    StatefulEvt: typeof StatefulEvt;
} = {} as any;




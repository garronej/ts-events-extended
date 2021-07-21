import type { StatefulReadonlyEvt } from "./StatefulReadonlyEvt.ts";
import type { StatefulPostable } from "./StatefulPostable.ts";


export interface StatefulEvt<T> extends StatefulReadonlyEvt<T>, StatefulPostable<T> {

     /** https://docs.evt.land/api/statefulevt#state */
    state: T;

};

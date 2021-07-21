import type { StatefulReadonlyEvt } from "./StatefulReadonlyEvt";
import type { StatefulPostable } from "./StatefulPostable";
export interface StatefulEvt<T> extends StatefulReadonlyEvt<T>, StatefulPostable<T> {
    /** https://docs.evt.land/api/statefulevt#state */
    state: T;
}

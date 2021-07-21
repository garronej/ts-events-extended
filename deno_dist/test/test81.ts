//NOTE: Type only

import * as _ from "../lib/index.ts";

_.dom.__hack;

{

    type T = void; type Source = _.Evt<void>;

    type A = _.ToNonPostableEvt<Source>;

    const x: _.NonPostableEvt<T> = null as any as A;x;

    type B = _.ToPostableEvt<A>

    const y: Source = null as any as B;y;

}
{
    type T = undefined; type Source = _.Evt<T>;

    type A = _.ToNonPostableEvt<Source>;

    const x: _.NonPostableEvt<T> = null as any as A;x;

    type B = _.ToPostableEvt<A>

    const y: B = null as any as Source; y;

}
{
    type T = undefined | number; type Source = _.Evt<T>;

    type A = _.ToNonPostableEvt<Source>;

    const x: _.NonPostableEvt<T> = null as any as A;x;

    type B = _.ToPostableEvt<A>

    const y: B = null as any as Source; y;

}
{
    type T = undefined; type Source = _.StatefulEvt<T>;

    type A = _.ToNonPostableEvt<Source>;

    const x: _.StatefulReadonlyEvt<T> = null as any as A;x;

    type B = _.ToPostableEvt<A>

    const y: B = null as any as Source; y;

}
{
    type T = undefined | number; type Source = _.StatefulEvt<T>;

    type A = _.ToNonPostableEvt<Source>;

    const x: _.StatefulReadonlyEvt<T> = null as any as A;x;

    type B = _.ToPostableEvt<A>

    const y: B = null as any as Source; y;

}

{

    type Source = {
        evtText: _.Evt<string | number>;
        evtIsConnected: _.StatefulReadonlyEvt<boolean | number>;
        evtTime: _.NonPostableEvt<number | Date>;
        evtTime2: _.StatefulReadonlyEvt<number | Date>;
        p: number;
    };

    type A = _.ToNonPostableEvt<Source>;

    const x: {
        evtText: _.NonPostableEvt<string | number>;
        evtIsConnected: _.StatefulReadonlyEvt<number | boolean>;
        evtTime: _.NonPostableEvt<number | Date>;
        evtTime2: _.StatefulReadonlyEvt<number | Date>;
        p: number;
    }= null as any as A; x;

    type B= _.ToPostableEvt<A>;

    const y: {
        evtText: _.Evt<string | number>;
        evtIsConnected: _.StatefulEvt<number | boolean>;
        evtTime: _.Evt<number | Date>;
        evtTime2: _.StatefulEvt<number | Date>;
        p: number;
    }= null as any as B; y;

}

console.log("PASS");




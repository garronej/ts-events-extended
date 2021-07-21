import { overwriteReadonlyProp } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/lab/overwriteReadonlyProp.ts";
import { importProxy } from "./importProxy.ts";
import type { StatefulEvt } from "./types/index.ts"
export class LazyStatefulEvt<T> {

    private initialPostCount = 0;
    private initialState: T;

    get evt(): StatefulEvt<T> {

        if (this.__evt === undefined) {
            this.__evt = new importProxy.StatefulEvt(this.initialState);
            //NOTE: For avoid keeping strong reference
            this.initialState = null as any;
            overwriteReadonlyProp(this.__evt, "postCount", this.initialPostCount);
        }

        return this.__evt;

    }
    declare private __evt: StatefulEvt<T>;

    constructor(initialState: T) {
        this.initialState = initialState;
    }


    private __post(data: T, doWait: false): number;
    private __post(data: T, doWait: true): Promise<void>;
    private __post(data: T, doWait: boolean): number | Promise<void> {

        if (this.__evt === undefined) {

            this.initialState = data;

            return ++this.initialPostCount;


        }

        return this.__evt[doWait ? "postAndWait" : "post"](data);

    }

    post(data: T) {
        return this.__post(data, false);
    }

    postAndWait(data: T) {
        return this.__post(data, true);
    }


}
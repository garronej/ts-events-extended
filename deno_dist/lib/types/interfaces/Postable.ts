
export interface Postable<T> {

    /** https://docs.evt.land/api/evt/post */
    postAsyncOnceHandled(data: T): number | Promise<number>;

    /** 
     * Returns post count 
     * */
    post(data: T): number;

    /** 
     * Post and wait for all async handler's callbacks have resolved.
     * 
     * https://docs.evt.land/api/evt/post#evt-postandwait-data-promise-less-than-void-greater-than 
     */
    postAndWait(data: T): Promise<void>;

}

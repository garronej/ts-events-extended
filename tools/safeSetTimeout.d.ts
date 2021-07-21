export declare type Timer = {
    _timerBrand: any;
};
export declare const safeSetTimeout: (callback: () => void, ms: number) => Timer;
export declare const safeClearTimeout: (timer: Timer) => void;

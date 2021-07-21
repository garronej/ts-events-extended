
//NOTE: Deno can't use NodeJS type def ( obviously )
export type Timer= { _timerBrand: any; };
export const safeSetTimeout = (callback: () => void, ms: number): Timer => setTimeout(callback, ms) as any;
export const safeClearTimeout = (timer: Timer): void => clearTimeout(timer as any);
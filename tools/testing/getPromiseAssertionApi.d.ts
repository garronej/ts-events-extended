export declare function getPromiseAssertionApi(params?: {
    takeIntoAccountArraysOrdering: boolean;
}): {
    mustResolve: <T>(params: {
        promise: Promise<T>;
        expectedData?: T | undefined;
        delay?: number | undefined;
    }) => Promise<T>;
    mustReject: (params: {
        promise: Promise<any>;
        expectedRejectedValue?: any;
        delay?: number;
    }) => Promise<void>;
    mustStayPending: (p: Promise<any>) => void;
};

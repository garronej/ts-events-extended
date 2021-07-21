import type { Handler } from "./types";
export declare function matchAll(): boolean;
export declare function parsePropsFromArgs<T>(inputs: readonly any[], methodName: "waitFor" | "attach*" | "pipe"): Handler.PropsFromArgs<T, any>;

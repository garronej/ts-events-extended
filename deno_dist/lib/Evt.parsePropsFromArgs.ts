
import type { Operator } from "./types/Operator.ts"
import { id } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/id.ts";
import { compose } from "./util/compose.ts";
import { typeGuard } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/typeGuard.ts"
import type { CtxLike, Handler } from "./types/index.ts";

export function matchAll() { return true; }

const canBeOperator = (p: undefined | CtxLike<any> | Operator<any, any>): boolean => {
    return (
        p !== undefined &&
        typeGuard<Operator<any, any>>(p, true) &&
        (
            typeof p === "function" ||
            typeof p[0] === "function"
        )
    );
};

const defaultParams: Handler.PropsFromArgs<any, any> = {
    "op": matchAll,
    "ctx": undefined,
    "timeout": undefined,
    "callback": undefined
};

export function parsePropsFromArgs<T>(
    inputs: readonly any[],
    methodName: "waitFor" | "attach*" | "pipe"
): Handler.PropsFromArgs<T, any> {

    type Out = Handler.PropsFromArgs<T, any>;

    switch (methodName) {
        case "pipe": {

            //[]
            //[undefined] ( not valid but user would expect it to work )
            //[ ctx, ...op[] ]
            //[ ...op[] ]

            const getOpWrap = (ops: [Operator<T, any>, ...Operator<any, any>[]]) =>
                ops.length === 0 ?
                    {}
                    :
                    { "op": ops.length === 1 ? ops[0] : compose(...ops) }
                ;

            if (canBeOperator(inputs[0])) {

                //[ ...op[] ]

                return id<Out>({
                    ...defaultParams,
                    ...getOpWrap(inputs as any)
                });

            } else {

                //[]
                //[ ctx, ...Operator.fλ[] ]

                const [ctx, ...rest] = inputs;

                return id<Out>({
                    ...defaultParams,
                    ...(ctx !== undefined ? { ctx } : {}),
                    ...getOpWrap(rest as any)
                });

            }


        } break;

        case "waitFor": {

            //[ op, ctx, timeout ]
            //[ op, ctx, undefined ]
            //[ op, ctx ]
            //[ op, timeout ]
            //[ op, undefined ]
            //[ ctx, timeout ]
            //[ ctx, undefined ]
            //[ op ]
            //[ ctx ]
            //[ timeout ]
            //[ undefined ]
            //[ callback ]

            return parsePropsFromArgs(
                [
                    //If the last element is undefined, remove it.
                    ...inputs.filter(
                        (value, index) => !(
                            index === inputs.length - 1 &&
                            value === undefined
                        )
                    ),
                    defaultParams.callback
                ],
                "attach*"
            );

        } break;
        case "attach*": {

            //NOTE: when callback is undefined call has been forward from waitFor.

            //[ op, ctx, timeout, callback ]
            //[ op, ctx, timeout, undefined ]
            //[ op, ctx, callback ]
            //[ op, ctx, undefined ]
            //[ op, timeout, callback ]
            //[ op, timeout, undefined ]
            //[ ctx, timeout, callback ]
            //[ ctx, timeout, undefined ]
            //[ op, callback ]
            //[ op, undefined ]
            //[ ctx, callback ]
            //[ ctx, undefined ]
            //[ timeout, callback ]
            //[ timeout, undefined ]
            //[ callback ]
            //[ undefined ]

            const n = inputs.length as 4 | 3 | 2 | 1 | 0;

            switch (n) {
                case 4: {

                    //[ op, ctx, timeout, callback ]
                    const [p1, p2, p3, p4] = inputs;

                    return id<Out>({
                        ...defaultParams,
                        "op": p1,
                        "ctx": p2,
                        "timeout": p3,
                        "callback": p4
                    });

                }
                case 3: {

                    //[ op, ctx, callback ]
                    //[ op, timeout, callback ]
                    //[ ctx, timeout, callback ]
                    const [p1, p2, p3] = inputs;
                    if (typeof p2 === "number") {
                        //[ op, timeout, callback ]
                        //[ ctx, timeout, callback ]

                        const timeout: Out["timeout"] = p2;
                        const callback: Out["callback"] = p3;

                        if (canBeOperator(p1)) {
                            //[ op, timeout, callback ]
                            return id<Out>({
                                ...defaultParams,
                                timeout,
                                callback,
                                "op": p1
                            });

                        } else {
                            //[ ctx, timeout, callback ]

                            return id<Out>({
                                ...defaultParams,
                                timeout,
                                callback,
                                "ctx": p1
                            });

                        }
                    } else {
                        //[ op, ctx, callback ]
                        return id<Out>({
                            ...defaultParams,
                            "op": p1,
                            "ctx": p2,
                            "callback": p3
                        });

                    }

                }
                case 2: {

                    //[ op, callback ]
                    //[ ctx, callback ]
                    //[ timeout, callback ]
                    const [p1, p2] = inputs;
                    if (typeof p1 === "number") {
                        //[ timeout, callback ]
                        return id<Out>({
                            ...defaultParams,
                            "timeout": p1,
                            "callback": p2
                        });
                    } else {
                        //[ op, callback ]
                        //[ ctx, callback ]
                        const callback: Out["callback"] = p2;
                        if (canBeOperator(p1)) {

                            return id<Out>({
                                ...defaultParams,
                                callback,
                                "op": p1
                            });

                        } else {

                            return id<Out>({
                                ...defaultParams,
                                callback,
                                "ctx": p1
                            });

                        }
                    }

                }
                case 1: {

                    //[ callback ]
                    const [p] = inputs;

                    return id<Out>({
                        ...defaultParams,
                        "callback": p
                    });

                }
                case 0: {
                    return id<Out>({ ...defaultParams });
                }

            }


        } break;

    }

}


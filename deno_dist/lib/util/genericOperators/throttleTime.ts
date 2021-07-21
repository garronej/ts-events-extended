import { compose } from "../compose.ts";

export const throttleTime = <T>(duration: number) =>
    compose<T, { data: T; lastClick: number; }, T>(
        [
            (data, { lastClick }) => {

                const now = Date.now();

                return now - lastClick < duration ?
                    null :
                    [{ data, "lastClick": now }]
                    ;

            },
            { "lastClick": 0, "data": null as any }
        ],
        ({ data }) => [data]
    );
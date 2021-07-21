import { compose } from "../compose.ts";
import { concatUint8Array } from "../../../tools/concatUint8Array.ts";

/** Output Uint8Array of fixed size*/
export const chunksOf = (byteLength: number) => {
    return compose<
        Uint8Array,
        {
            currByteLength: number;
            chunks: Uint8Array[];
            rest: Uint8Array | undefined
        },
        Uint8Array
    >(
        [
            (chunk_, prev) => {

                const [chunk, previousByteLength, chunks] =
                    prev.rest !== undefined ?
                        [concatUint8Array([chunk_, prev.rest]), 0, []]
                        :
                        [chunk_, prev.currByteLength, prev.chunks]
                    ;

                const currByteLength = previousByteLength + chunk.byteLength;

                return [
                    {
                        currByteLength,
                        "chunks": [...chunks, chunk],
                        "rest": currByteLength >= byteLength ?
                            chunk.slice(byteLength - currByteLength)
                            :
                            undefined

                    }
                ];
            },
            {
                "currByteLength": 0,
                "chunks": [],
                "rest": undefined
            }
        ],
        ({ rest, chunks }) => rest !== undefined ?
            [concatUint8Array(chunks, byteLength)] :
            null
    )

};

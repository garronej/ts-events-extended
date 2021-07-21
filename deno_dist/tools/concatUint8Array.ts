
export const concatUint8Array = (
    chunks: (Uint8Array | Int8Array)[],
    byteLength?: number
): Uint8Array => {

    byteLength = byteLength !== undefined ?
        byteLength :
        chunks.reduce<number>((prev, { byteLength }) => prev + byteLength, 0)
        ;

    return chunks.reduce(
        ({ out, n }, chunk) => {

            out.set(
                chunk.slice(
                    0,
                    Math.min(chunk.byteLength, byteLength! - n)
                ),
                n
            );

            return {
                out,
                "n": n + chunk.length
            };

        },
        { "out": new Uint8Array(byteLength), "n": 0 }
    ).out
        ;

}
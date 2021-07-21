
import { Evt, TimeoutEvtError } from "../lib/index.ts";
import { assert } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/assert.ts";
import { id } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/id.ts";
import { every } from "../tools/reducers/index.ts";
import { getPromiseAssertionApi } from "../tools/testing/getPromiseAssertionApi.ts";
import { concatUint8Array } from "../tools/concatUint8Array.ts";

//const { mustReject, mustResolve } = getPromiseAssertionApi();
const { mustResolve, mustReject } = getPromiseAssertionApi({ "takeIntoAccountArraysOrdering": true });

//import { Operator } from "../lib/types/Operator";

const MESSAGE_TOO_MUCH_BYTES = "Received to much data";
const MESSAGE_CANCEL = "Download canceled by user";

function downloadFile(
    { fileSize, evtChunk, evtBtnCancelClick, evtSocketError, timeout }: {
        fileSize: number;
        evtChunk: Evt<Uint8Array>;
        evtBtnCancelClick: Evt<void>;
        evtSocketError: Evt<Error>;
        timeout: number;
    }
): Promise<Uint8Array> {

    const ctxDl = Evt.newCtx<Uint8Array>();

    evtSocketError.attachOnce(
        ctxDl,
        error => ctxDl.abort(error)
    );

    evtBtnCancelClick.attachOnce(
        ctxDl,
        () => ctxDl.abort(new Error(MESSAGE_CANCEL))
    );

    evtChunk
        .pipe(ctxDl)
        .pipe([
            (chunk, { byteLength, chunks }) => [{
                "byteLength": byteLength + chunk.length,
                "chunks": [...chunks, chunk]
            }],
            {
                "byteLength": 0,
                "chunks": id<Uint8Array[]>([])
            }
        ])
        .pipe(({ byteLength }) => byteLength >= fileSize)
        .pipe(
            ({ byteLength, chunks }, registerSideEffect) => (
                byteLength > fileSize ?
                    (registerSideEffect(() => ctxDl.abort(new Error(MESSAGE_TOO_MUCH_BYTES))), null) :
                    [chunks]
            )
        )
        .pipe(chunks => [concatUint8Array(chunks, fileSize)])
        .attach(rawFile => ctxDl.done(rawFile))
        ;

    return ctxDl.waitFor(timeout);

}

const evtChunk = new Evt<Uint8Array>();
const evtBtnCancelClick = Evt.create();
const evtSocketError = new Evt<Error>();

(async () => {

    await (async () => {

        const prDl = downloadFile({
            evtChunk,
            evtBtnCancelClick,
            evtSocketError,
            "fileSize": 9,
            "timeout": 100
        })

        evtChunk.post(new Uint8Array([1, 2, 3]));
        evtChunk.post(new Uint8Array([4, 5, 6]));
        evtChunk.post(new Uint8Array([7, 0, 1]));

        assert(
            [
                evtChunk,
                evtBtnCancelClick,
                evtSocketError
            ].reduce(...every<Evt<any>>(evt => evt.getHandlers().length === 0))
        );

        await mustResolve({
            "promise": prDl,
            "expectedData": new Uint8Array([1, 2, 3, 4, 5, 6, 7, 0, 1])
        });

    })();

    await (async () => {

        const prDl = downloadFile({
            evtChunk,
            evtBtnCancelClick,
            evtSocketError,
            "fileSize": 7,
            "timeout": 100
        })

        evtChunk.post(new Uint8Array([1, 2, 3]));
        evtChunk.post(new Uint8Array([4, 5, 6]));
        evtChunk.post(new Uint8Array([7, 0, 1]));

        assert(
            [
                evtChunk,
                evtBtnCancelClick,
                evtSocketError
            ].reduce(...every<Evt<any>>(evt => evt.getHandlers().length === 0))
        );

        await mustReject({
            "promise": prDl.catch(error => { throw error.message; }),
            "expectedRejectedValue": MESSAGE_TOO_MUCH_BYTES
        });


    })();

    await (async () => {

        const prDl = downloadFile({
            evtChunk,
            evtBtnCancelClick,
            evtSocketError,
            "fileSize": 9,
            "timeout": 100
        })

        evtChunk.post(new Uint8Array([1, 2, 3]));
        evtChunk.post(new Uint8Array([4, 5, 6]));

        evtBtnCancelClick.post();

        assert(
            [
                evtChunk,
                evtBtnCancelClick,
                evtSocketError
            ].reduce(...every<Evt<any>>(evt => evt.getHandlers().length === 0))
        );


        await mustReject({
            "promise": prDl.catch(error => { throw error.message; }),
            "expectedRejectedValue": MESSAGE_CANCEL
        });


    })();

    await (async () => {

        const prDl = downloadFile({
            evtChunk,
            evtBtnCancelClick,
            evtSocketError,
            "fileSize": 9,
            "timeout": 100
        })

        evtChunk.post(new Uint8Array([1, 2, 3]));
        evtChunk.post(new Uint8Array([4, 5, 6]));

        const m = "socket error";

        evtSocketError.post(new Error(m));

        assert(
            [
                evtChunk,
                evtBtnCancelClick,
                evtSocketError
            ].reduce(...every<Evt<any>>(evt => evt.getHandlers().length === 0))
        );


        await mustReject({
            "promise": prDl.catch(error => { throw error.message; }),
            "expectedRejectedValue": m
        });


    })();

    await (async () => {

        const prDl = downloadFile({
            evtChunk,
            evtBtnCancelClick,
            evtSocketError,
            "fileSize": 9,
            "timeout": 100
        })

        evtChunk.post(new Uint8Array([1, 2, 3]));
        evtChunk.post(new Uint8Array([4, 5, 6]));

        await mustReject({
            "promise": prDl.catch(error => {

                assert(error instanceof TimeoutEvtError);

                throw "";
            }),
            "expectedRejectedValue": "",
            "delay": 150
        });

        assert(
            [
                evtChunk,
                evtBtnCancelClick,
                evtSocketError
            ].reduce(...every<Evt<any>>(evt => evt.getHandlers().length === 0))
        );

    })();

    console.log("PASS");

})();


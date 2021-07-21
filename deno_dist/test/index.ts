const __dirname = (() => {
    const { url: urlStr } = import.meta;
    const url = new URL(urlStr);
    const __filename = (url.protocol === "file:" ? url.pathname : urlStr)
        .replace(/[/][^/]*$/, '');

    const isWindows = (() => {

        let NATIVE_OS: typeof Deno.build.os = "linux";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const navigator = (globalThis as any).navigator;
        if (globalThis.Deno != null) {
            NATIVE_OS = Deno.build.os;
        } else if (navigator?.appVersion?.includes?.("Win") ?? false) {
            NATIVE_OS = "windows";
        }

        return NATIVE_OS == "windows";

    })();

    return isWindows ?
        __filename.split("/").join("\\").substring(1) :
        __filename;
})();


process.once("unhandledRejection", error => {

    throw error;

});
console.assert = (condition: any, msg?: string) => {
    if (!condition) {
        throw new Error(msg);
    }
};

import { existsSync } from "https://deno.land/std@0.85.0/node/fs.ts";
import { join } from "https://deno.land/std@0.85.0/node/path.ts";


(async ()=>{

let n = process.argv[2];

if (n) {

    require("./test" + n);

} else {

    require("../tools/reducers/test");
    require("../tools/inDepth/test");

    require("../test/test52");

    await new Promise(resolve => setTimeout(resolve, 2400));

    const n = 99;

    console.log({ n });

    for (let i = 1; i <= n; i++) {

        if( i === 52 ){
            continue;
        }

        const filePath = join(__dirname,"./test" + i);

        if( !existsSync(filePath + ".js") ){
            continue;
        }

        try {

            require(filePath);

        } catch (error) {

            console.log(`Fail test ${i}`);

            throw error;


        }

    }
}


})();

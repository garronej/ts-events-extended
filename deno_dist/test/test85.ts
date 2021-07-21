import { Evt, Ctx } from "../lib/index.ts";
import { assert } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/assert.ts";

assert(Evt.name === "Evt");
assert(Ctx.name === "Ctx");

console.log("PASS");
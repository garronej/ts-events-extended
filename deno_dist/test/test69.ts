//NOTE: Only test type
import { Evt } from "../lib/index.ts";

const ctx= Evt.newCtx();

ctx.done();

const ctxBool = Evt.newCtx<boolean>();

ctxBool.done(true);
ctxBool.done(false);

console.log("PASS");

export * from "./helper/index.ts";
export * from "./interfaces/index.ts";

export type { Handler } from "./Handler.ts";

export * as dom from "./lib.dom.ts";

//NOTE: For support of --no-check, see: https://github.com/asos-craigmorten/opine/issues/97#issuecomment-751806014
export * from "./EventTargetLike.ts";
export * from "./EvtError.ts";
export * from "./Operator.ts";

/*
NOTE: In theory react should be a peer dependency
instead of a dev dependency.
But given that /hook is just a plugin for using Evt
with react we don't want to require react to be
installed to install Evt.
*/
export { useEvt } from "./useEvt.ts";
export { useRerenderOnStateChange } from "./useRerenderOnStateChange.ts";
export { useElementEvt } from "./useElementEvt.ts";
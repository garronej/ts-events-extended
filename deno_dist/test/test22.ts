
import { Evt } from "../lib/index.ts";
import { getPromiseAssertionApi } from "../tools/testing/index.ts";
import {getHandlerPr } from "./getHandlerPr.ts";
const { mustResolve, mustReject } = getPromiseAssertionApi();

let op = (object: Object): object is Array<any> => object instanceof Array;

let boundTo = Evt.newCtx();

let timeout = 10;

function mkCb(expect: Object[]) {

    expect = [...expect];

    let timer = setTimeout(() => console.assert(!expect.length), 2000);

    return (object: Object) => {
        console.assert(expect.shift() === object);
        clearTimeout(timer);
    }

}


(() => {

    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    let expect = posts.filter(op);

    mustResolve({
        "promise": evt.attach(op, boundTo, timeout, mkCb(expect)),
        "expectedData": expect[0],
        "delay": 2000
    });

    posts.forEach(object => evt.post(object));


})();

(() => {

    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    let expect = posts.filter(op);

    mustResolve({
        "promise": evt.attach(op, timeout, mkCb(expect)),
        "expectedData": expect[0],
        "delay": 2000
    });

    posts.forEach(object => evt.post(object));


})();


(() => {

    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    let expect = posts.filter(op);

    mustResolve({
        "promise": getHandlerPr(
            evt, 
            ()=>evt.attach(op, mkCb(expect))
        ),
        "expectedData": expect[0],
        "delay": 2000
    });

    posts.forEach(object => evt.post(object));


})();

(() => {


    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    let expect = [...posts];

    mustResolve({
        "promise": getHandlerPr(evt, () => evt.attach(mkCb(expect))),
        "expectedData": expect[0],
        "delay": 2000
    });

    posts.forEach(object => evt.post(object));


})();

(() => {


    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    let expect = [...posts];

    mustResolve({
        "promise": evt.attach(timeout, mkCb(expect)),
        "expectedData": expect[0],
        "delay": 2000
    });

    posts.forEach(object => evt.post(object));


})();

(() => {


    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    let expect = [...posts];

    mustResolve({
        "promise": getHandlerPr(evt, ()=> evt.attach(boundTo, mkCb(expect))), 
        "expectedData": expect[0],
        "delay": 2000
    });

    posts.forEach(object => evt.post(object));


})();

(() => {


    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    let expect = [...posts];

    mustResolve({
        "promise": evt.attach(boundTo, timeout, mkCb(expect)),
        "expectedData": expect[0],
        "delay": 2000
    });

    posts.forEach(object => evt.post(object));


})();

(() => {

    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    mustReject({ "promise": evt.attach(op, timeout, () => { }), "delay": 3000 });

    posts.filter(object => !op(object)).forEach(object => evt.post(object));

})();

(() => {

    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    mustReject({ "promise": evt.attach(op, boundTo, timeout, () => { }), "delay": 2000 });

    posts.filter(object => !op(object)).forEach(object => evt.post(object));

})();

(() => {

    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    mustReject({ "promise": evt.attach(boundTo, timeout, () => { }), "delay": 2000 });


})();











(() => {

    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    let expect = posts.filter(op);

    mustResolve({
        "promise": evt.attachPrepend(op, boundTo, timeout, mkCb(expect)),
        "expectedData": expect[0],
        "delay": 2000
    });

    posts.forEach(object => evt.post(object));


})();


(() => {

    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    let expect = posts.filter(op);

    mustResolve({
        "promise": evt.attachPrepend(op, timeout, mkCb(expect)),
        "expectedData": expect[0],
        "delay": 2000
    });

    posts.forEach(object => evt.post(object));


})();


(() => {

    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    let expect = posts.filter(op);

    mustResolve({
        "promise": getHandlerPr(evt, ()=> evt.attachPrepend(op, mkCb(expect))),
        "expectedData": expect[0],
        "delay": 2000
    });

    posts.forEach(object => evt.post(object));


})();


(() => {


    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    let expect = [...posts];

    mustResolve({
        "promise": getHandlerPr(evt, ()=> evt.attachPrepend(mkCb(expect))),
        "expectedData": expect[0],
        "delay": 2000
    });

    posts.forEach(object => evt.post(object));


})();


(() => {


    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    let expect = [...posts];

    mustResolve({
        "promise": evt.attachPrepend(timeout, mkCb(expect)),
        "expectedData": expect[0],
        "delay": 2000
    });

    posts.forEach(object => evt.post(object));


})();


(() => {


    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    let expect = [...posts];

    mustResolve({
        "promise": getHandlerPr(evt, ()=>evt.attachPrepend(boundTo, mkCb(expect))),
        "expectedData": expect[0],
        "delay": 2000
    });

    posts.forEach(object => evt.post(object));


})();


(() => {


    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    let expect = [...posts];

    mustResolve({
        "promise": evt.attachPrepend(boundTo, timeout, mkCb(expect)),
        "expectedData": expect[0],
        "delay": 2000
    });

    posts.forEach(object => evt.post(object));


})();


(() => {

    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    mustReject({
        "promise": evt.attachPrepend(op, timeout, () => { }),
        "delay": 2000
    });

    posts.filter(object => !op(object)).forEach(object => evt.post(object));

})();


(() => {

    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    mustReject({ "promise": evt.attachPrepend(op, boundTo, timeout, () => { }), "delay": 2000 });

    posts.filter(object => !op(object)).forEach(object => evt.post(object));

})();


(() => {

    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    mustReject({ "promise": evt.attachPrepend(boundTo, timeout, () => { }), "delay": 2000 });


})();







(() => {

    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    let expect = posts.filter(op);

    mustResolve({
        "promise": evt.attachOnce(op, boundTo, timeout, mkCb([expect[0]])),
        "expectedData": expect[0],
        "delay": 2000
    });

    posts.forEach(object => evt.post(object));


})();

(() => {

    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    let expect = posts.filter(op);

    mustResolve({
        "promise": evt.attachOnce(op, timeout, mkCb([expect[0]])),
        "expectedData": expect[0],
        "delay": 2000
    });

    posts.forEach(object => evt.post(object));


})();

(() => {

    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    let expect = posts.filter(op);

    mustResolve({
        "promise": getHandlerPr(evt, ()=> evt.attachOnce(op, mkCb([expect[0]]))),
        "expectedData": expect[0],
        "delay": 2000
    });

    posts.forEach(object => evt.post(object));


})();

(() => {


    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    let expect = [...posts];

    mustResolve({
        "promise": getHandlerPr(evt,()=> evt.attachOnce(mkCb([expect[0]]))),
        "expectedData": expect[0],
        "delay": 2000
    });

    posts.forEach(object => evt.post(object));


})();

(() => {


    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    let expect = [...posts];

    mustResolve({
        "promise": evt.attachOnce(timeout, mkCb([expect[0]])),
        "expectedData": expect[0],
        "delay": 2000
    });

    posts.forEach(object => evt.post(object));


})();

(() => {


    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    let expect = [...posts];

    mustResolve({
        "promise": getHandlerPr(evt, () => evt.attachOnce(boundTo, mkCb([expect[0]]))),
        "expectedData": expect[0],
        "delay": 2000
    });

    posts.forEach(object => evt.post(object));


})();

(() => {


    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    let expect = [...posts];

    mustResolve({
        "promise": evt.attachOnce(boundTo, timeout, mkCb([expect[0]])),
        "expectedData": expect[0],
        "delay": 2000
    });

    posts.forEach(object => evt.post(object));


})();

(() => {

    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    mustReject({
        "promise": evt.attachOnce(op, timeout, () => { }),
        "delay": 2000
    });

    posts.filter(object => !op(object)).forEach(object => evt.post(object));

})();

(() => {

    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    mustReject({ "promise": evt.attachOnce(op, boundTo, timeout, () => { }), "delay": 2000 });

    posts.filter(object => !op(object)).forEach(object => evt.post(object));

})();

(() => {

    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    mustReject({ "promise": evt.attachOnce(boundTo, timeout, () => { }), "delay": 2000 });


})();








(() => {

    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    let expect = posts.filter(op);

    mustResolve({
        "promise": evt.attachOnce(op, boundTo, timeout, mkCb([expect[1]])),
        "expectedData": expect[1],
        "delay": 2000
    });

    mustResolve({
        "promise": evt.attachOnceExtract(op, boundTo, timeout, mkCb([expect[0]])),
        "expectedData": expect[0],
        "delay": 2000
    });


    posts.forEach(object => evt.post(object));


})();

(() => {

    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    let expect = posts.filter(op);

    mustResolve({
        "promise": evt.attachOnce(op, timeout, mkCb([expect[1]])),
        "expectedData": expect[1],
        "delay": 2000
    });

    mustResolve({
        "promise": evt.attachOnceExtract(op, timeout, mkCb([expect[0]])),
        "expectedData": expect[0],
        "delay": 2000
    });


    posts.forEach(object => evt.post(object));


})();

(() => {

    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    let expect = posts.filter(op);

    mustResolve({
        "promise": getHandlerPr(evt,()=> evt.attachOnce(op, mkCb([expect[1]]))),
        "expectedData": expect[1],
        "delay": 2000
    });

    mustResolve({
        "promise": getHandlerPr(evt, () => evt.attachOnceExtract(op, mkCb([expect[0]]))),
        "expectedData": expect[0],
        "delay": 2000
    });


    posts.forEach(object => evt.post(object));


})();

(() => {


    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    let expect = [...posts];

    mustResolve({
        "promise": getHandlerPr(evt,()=> evt.attachOnce(mkCb([expect[1]]))),
        "expectedData": expect[1],
        "delay": 2000
    });

    mustResolve({
        "promise": getHandlerPr(evt,()=> evt.attachOnceExtract(mkCb([expect[0]]))),
        "expectedData": expect[0],
        "delay": 2000
    });


    posts.forEach(object => evt.post(object));


})();

(() => {


    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    let expect = [...posts];

    mustResolve({
        "promise": evt.attachOnce(timeout, mkCb([expect[1]])),
        "expectedData": expect[1],
        "delay": 2000
    });

    mustResolve({
        "promise": evt.attachOnceExtract(timeout, mkCb([expect[0]])),
        "expectedData": expect[0],
        "delay": 2000
    });


    posts.forEach(object => evt.post(object));


})();

(() => {


    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    let expect = [...posts];

    mustResolve({
        "promise": getHandlerPr(evt, ()=> evt.attachOnce(boundTo, mkCb([expect[1]]))),
        "expectedData": expect[1],
        "delay": 2000
    });

    mustResolve({
        "promise": getHandlerPr(evt, ()=> evt.attachOnceExtract(boundTo, mkCb([expect[0]]))),
        "expectedData": expect[0],
        "delay": 2000
    });


    posts.forEach(object => evt.post(object));


})();

(() => {


    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    let expect = [...posts];

    mustResolve({
        "promise": evt.attachOnce(boundTo, timeout, mkCb([expect[1]])),
        "expectedData": expect[1],
        "delay": 2000
    });

    mustResolve({
        "promise": evt.attachOnceExtract(boundTo, timeout, mkCb([expect[0]])),
        "expectedData": expect[0],
        "delay": 2000
    });


    posts.forEach(object => evt.post(object));


})();

(() => {

    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    mustReject({
        "promise": evt.attachOnceExtract(op, timeout, () => { }),
        "delay": 2000
    });

    posts.filter(object => !op(object)).forEach(object => evt.post(object));

})();

(() => {

    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    let posts = [[], [], [], "foo", {}, []];

    mustReject({ "promise": evt.attachOnceExtract(op, boundTo, timeout, () => { }), "delay": 2000 });

    posts.filter(object => !op(object)).forEach(object => evt.post(object));

})();

(() => {

    let evt = new Evt<Object>();

    //evt.enableTrace("evt");

    mustReject({ "promise": evt.attachOnceExtract(boundTo, timeout, () => { }), "delay": 2000 });


})();

setTimeout(() => {

    console.log("PASS");

}, 2100);


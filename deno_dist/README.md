<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/76674598-91ebfc00-65b1-11ea-88df-eb43f04f3cce.png">  
</p>
<p align="center">
    💧<i>EventEmitter's typesafe replacement</i>💧
    <br>
    <br>
    <img src="https://github.com/garronej/evt/workflows/ci/badge.svg?branch=develop">
    <img src="https://img.shields.io/bundlephobia/minzip/evt">
    <img src="https://img.shields.io/npm/dw/evt">
    <img src="https://img.shields.io/npm/l/evt">
</p>

+ [Home](https://www.evt.land)
+ [Documentation](https://docs.evt.land/overview)

---

`'evt'` is intended to be a replacement for `'events'`.  
It enables makes heavy use of **typescript**'s type inference features to provide **type safety** while keeping things **concise and elegant** 🍸.

<b>Suitable for any JS runtime env (deno, node, old browsers, react-native ...)</b>
- ✅ It is both a [Deno](https://deno.land/x/evt) and an [NPM](https://www.npmjs.com/evt) module. ( Achieved with [Denoify](https://github.com/garronej/denoify) ) 
- ✅ Lightweight, no dependency.
- ✅ No polyfills needed, the NPM module is transpiled down to ES3
- ✅ [React Hooks integration](https://stackblitz.com/edit/evt-react-hooks-todo-list?file=index.tsx)

Can be imported in TypeScript projects using version &gt;= **3.4** \(Mar 2019\) and in any plain JS projects.

# TL;DR*

```typescript
import { Evt } from "evt";

const evtText = new Evt<string>();
const evtTime = new Evt<number>();

evtText.attach(text => console.log(text));
evtTime.attachOnce(time => console.log(time));

evtText.post("hi!"); //Prints "hi!"
evtTime.post(123);   //Prints "123"
evtTime.post(1234);  //Prints nothing
```
OR
```typescript
import { Evt, to } from "evt";

const evt = new Evt<
    [ "text",  string ] | 
    [ "time",  number ]
>();

//Mind the '$' prefixing 'attach'
evt.$attach(to("text"), text => console.log(text));
evt.$attachOnce(to("time"), time => console.log(time));

evt.post(["text", "hi!"]);
evt.post(["time", 123]);
evt.post(["time", 1234]);
```

_*Those are introductory examples, EVT can do much more than this._

# Who is using it

<p align="center">
    <a href="https://connext.network">
        <img src="https://user-images.githubusercontent.com/6702424/84102640-4e1e5c80-aa11-11ea-9d13-df0a65c8cdaf.png">
    </a>
    <a href="https://www.semasim.com">
        <img src="https://user-images.githubusercontent.com/6702424/84102785-aead9980-aa11-11ea-915b-5c4a5282c44e.png"> 
    </a>
    <br>
    <a href="https://thegraph.com">
        <img src="https://user-images.githubusercontent.com/6702424/85961024-ed4aca00-b9a7-11ea-9c7e-03e2f59e6d21.png"> 
    </a>
</p>

# Install / Import

## In Deno:
```typescript
import { Evt } from "https://deno.land/x/evt/mod.ts";
```
## Anywhere else:
```bash
$ npm install --save evt
```
```typescript
import { Evt } from "evt"; 
```

## Import from HTML, with CDN

```html
<script src="//unpkg.com/evt/bundle.min.js"></script>
<script>
    const { Evt } = window["evt"];
</script>
```

# Try it

[Run some examples](https://stackblitz.com/edit/evt-playground?embed=1&file=index.ts&hideExplorer=1)

<p align="center"> 
    <img src="https://www.evt.land/assets/img/try-in-browser.gif">  
</p>

# Motivations

There are a lot of things that can't easily be done with `EventEmitter`:

* Enforcing **type safety**.
* Removing a particular listener ( if the callback is an anonymous function ).
* Adding a one-time listener for the next event that meets a condition.
* Waiting \(via a Promise\) for one thing or another to happen.  
_Example: waiting at most one second for the next message, stop waiting if the socket disconnects._

Why would someone pick EVT over RxJS:  

* RxJS introduces a lot of abstractions. It's a big jump from ``EventEmitter``.
* With RxJS It is often needed to resort to custom [type guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards), the filter operator [breaks the type inference.](https://stackblitz.com/edit/evt-795plc?embed=1&file=index.ts&hideExplorer=1)
* RxJS tends to be quite verbose.
* It could be months before RxJS it eventually supports Deno.
* No official guideline on how to integrate RxJS with React.

EVT is an attempt to address all these points while trying to remain as accessible as `EventEmitter`.  
  
</br>

[Get started](https://docs.evt.land/overview#rxjs-comparison)

# The sticker

<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/90626180-e3607d00-e21a-11ea-9c88-82880ac9cedf.png">  
</p>
<p align="center">
    <a href="https://teespring.com/fr/evt-sticker">Shop</a>
</p>
